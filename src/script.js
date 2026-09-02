(function () {
  function initSidebarToggle() {
    const toggleButton = document.querySelector("[data-sidebar-toggle]");
    const sidebar = document.getElementById("docs-sidebar");
    const overlay = document.querySelector("[data-sidebar-overlay]");

    if (!toggleButton || !sidebar || !overlay) {
      return;
    }

    const setState = function (isOpen) {
      document.body.classList.toggle("docs-sidebar-open", isOpen);
      toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
      overlay.hidden = !isOpen;
    };

    toggleButton.addEventListener("click", function () {
      setState(!document.body.classList.contains("docs-sidebar-open"));
    });

    overlay.addEventListener("click", function () {
      setState(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setState(false);
      }
    });
  }

  function initNavToggles() {
    document.querySelectorAll("[data-nav-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        const section = button.closest("[data-nav-section]");
        const list = section ? section.querySelector("[data-nav-list]") : null;

        if (!list) {
          return;
        }

        const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", isExpanded ? "false" : "true");
        list.hidden = isExpanded;
      });
    });
  }

  function initActiveNavScroll() {
    const sidebarBody = document.querySelector(".docs-sidebar__body");

    if (!sidebarBody) {
      return;
    }

    const currentLink = sidebarBody.querySelector(
      ".docs-nav__link.is-current, .docs-nav__section-link.is-current",
    );

    if (!currentLink) {
      return;
    }

    const topSection =
      currentLink.closest(".docs-nav__section--top") ||
      currentLink.closest("[data-nav-section]");

    if (!topSection) {
      return;
    }

    const sectionHead =
      topSection.querySelector(".docs-nav__section-head") || topSection;

    window.requestAnimationFrame(function () {
      const bodyRect = sidebarBody.getBoundingClientRect();
      const sectionRect = sectionHead.getBoundingClientRect();
      const targetScrollTop =
        sidebarBody.scrollTop + sectionRect.top - bodyRect.top;

      sidebarBody.scrollTop = Math.max(0, targetScrollTop);
    });
  }

  function initCopyButtons() {
    document.querySelectorAll(".docs-content pre").forEach(function (pre) {
      if (pre.querySelector(".docs-copy-button") || pre.classList.contains("mermaid")) {
        return;
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = "docs-copy-button";
      button.textContent = "Copy";

      button.addEventListener("click", async function () {
        const code = pre.querySelector("code");
        const text = code ? code.innerText : pre.innerText;

        try {
          await navigator.clipboard.writeText(text);
          button.textContent = "Copied";
          window.setTimeout(function () {
            button.textContent = "Copy";
          }, 1500);
        } catch (error) {
          button.textContent = "Failed";
          window.setTimeout(function () {
            button.textContent = "Copy";
          }, 1500);
        }
      });

      pre.appendChild(button);
    });
  }

  function initTocHighlight() {
    var tocPanel = document.querySelector(".docs-toc-panel");
    var tocLinks = document.querySelectorAll("[data-toc-link]");

    if (!tocPanel || !tocLinks.length) {
      return;
    }

    // Build mini TOC bars dynamically (indented by heading level)
    var miniContainer = document.createElement("div");
    miniContainer.className = "docs-toc-mini";

    tocLinks.forEach(function (link) {
      var li = link.closest(".docs-toc__item");
      var level = 2;

      if (li) {
        var match = li.className.match(/docs-toc__item--level-(\d)/);

        if (match) {
          level = parseInt(match[1], 10);
        }
      }

      var bar = document.createElement("div");
      bar.className = "docs-toc-mini__item docs-toc-mini__item--level-" + level;
      miniContainer.appendChild(bar);
    });

    tocPanel.insertBefore(miniContainer, tocPanel.firstChild);
    tocPanel.classList.add("has-mini-toc");

    // Collect heading elements for scroll tracking
    var headingElements = [];

    tocLinks.forEach(function (link) {
      var id = link.getAttribute("href").replace(/^#/, "");
      var el = document.getElementById(id);

      if (el) {
        headingElements.push(el);
      }
    });

    var miniBars = miniContainer.querySelectorAll(".docs-toc-mini__item");

    function updateActiveItem() {
      var closestIdx = -1;
      var closestDistance = Infinity;

      for (var i = 0; i < headingElements.length; i++) {
        var rect = headingElements[i].getBoundingClientRect();
        var distanceFromTop = Math.abs(rect.top);

        if (
          distanceFromTop < closestDistance &&
          rect.bottom > 0 &&
          rect.top < window.innerHeight
        ) {
          closestDistance = distanceFromTop;
          closestIdx = i;
        }
      }

      miniBars.forEach(function (bar, i) {
        bar.classList.toggle("is-active", i === closestIdx);
      });

      tocLinks.forEach(function (link, i) {
        link.classList.toggle("is-active", i === closestIdx);
      });
    }

    window.addEventListener("scroll", updateActiveItem, { passive: true });
    updateActiveItem();
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href").slice(1);

        if (!targetId) {
          return;
        }

        const target = document.getElementById(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${targetId}`);
      });
    });
  }

  function initReleaseAnnouncement() {
    var modal = document.querySelector("[data-release-announcement]");
    var dialog = document.querySelector(
      ".docs-release-announcement__dialog",
    );
    var closeButton = document.querySelector(
      "[data-release-announcement-close]",
    );
    var openButtons = document.querySelectorAll(
      "[data-release-announcement-open]",
    );
    var dismissedAtKey = "arraysubs_release_2026_09_dismissed_at";
    var dismissalWindowMs = 60 * 60 * 1000;
    var autoOpenDelayMs = 7000;
    var timer = null;
    var previousFocus = null;

    if (!modal || !dialog || !closeButton) {
      return;
    }

    function wasRecentlyDismissed() {
      try {
        var dismissedAt = parseInt(
          window.localStorage.getItem(dismissedAtKey) || "",
          10,
        );

        return (
          Number.isFinite(dismissedAt) &&
          Date.now() - dismissedAt < dismissalWindowMs
        );
      } catch (error) {
        return false;
      }
    }

    function rememberDismissal() {
      try {
        window.localStorage.setItem(dismissedAtKey, String(Date.now()));
      } catch (error) {
        // Storage can be unavailable in restricted browser modes. Closing the
        // announcement should still work for the current page.
      }
    }

    function getFocusableElements() {
      return dialog.querySelectorAll(
        "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
      );
    }

    function openAnnouncement() {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }

      previousFocus =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      modal.hidden = false;
      document.body.classList.add("docs-release-announcement-visible");

      window.requestAnimationFrame(function () {
        closeButton.focus();
      });
    }

    function closeAnnouncement() {
      modal.hidden = true;
      document.body.classList.remove("docs-release-announcement-visible");
      rememberDismissal();

      if (previousFocus) {
        previousFocus.focus();
        previousFocus = null;
      }
    }

    function handleKeydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAnnouncement();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      var focusable = getFocusableElements();

      if (!focusable.length) {
        return;
      }

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    openButtons.forEach(function (button) {
      button.addEventListener("click", openAnnouncement);
    });
    closeButton.addEventListener("click", closeAnnouncement);
    dialog.addEventListener("keydown", handleKeydown);
    modal.addEventListener("mousedown", function (event) {
      if (event.target === modal) {
        closeAnnouncement();
      }
    });
    window.addEventListener(
      "arraysubs:open-release-announcement",
      openAnnouncement,
    );

    if (!wasRecentlyDismissed()) {
      timer = window.setTimeout(openAnnouncement, autoOpenDelayMs);
    }
  }

  function initCookieConsent() {
    var preferenceButtons = document.querySelectorAll("[data-cookie-preferences]");
    var preferenceModal = document.querySelector("[data-cookie-preferences-modal]");
    var preferenceDialog = document.querySelector(".docs-cookie-preferences__dialog");
    var preferenceAcceptButton = document.querySelector("[data-cookie-preferences-accept]");
    var preferenceRejectButton = document.querySelector("[data-cookie-preferences-reject]");
    var preferenceCloseButton = document.querySelector("[data-cookie-preferences-close]");
    var gpcNotice = document.querySelector("[data-cookie-preferences-gpc]");
    var cookieName = "cc_cookie";
    var cookieMaxAge = 60 * 60 * 24 * 180;
    var consentVersion = 2;
    var retargetingCookieName = "array_hash_re_ok";
    var retargetingIdLength = 12;
    var retargetingAlphabet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var consent = null;
    var previousFocus = null;
    var gpcEnabled = Boolean(window.navigator.globalPrivacyControl);

    if (
      !preferenceModal ||
      !preferenceDialog ||
      !preferenceAcceptButton ||
      !preferenceRejectButton ||
      !preferenceCloseButton ||
      !gpcNotice
    ) {
      return;
    }

    function readCookie(name) {
      var cookies = document.cookie ? document.cookie.split("; ") : [];

      for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].indexOf(name + "=") === 0) {
          return cookies[i].slice(name.length + 1);
        }
      }

      return null;
    }

    function decodeConsent() {
      var value = readCookie(cookieName);

      if (!value) {
        return null;
      }

      try {
        var parsed = JSON.parse(decodeURIComponent(value));

        if (
          parsed.version !== consentVersion ||
          parsed.necessary !== true ||
          typeof parsed.retargeting !== "boolean"
        ) {
          return null;
        }

        return {
          version: consentVersion,
          necessary: true,
          analytics: true,
          retargeting: parsed.retargeting,
          updatedAt:
            typeof parsed.updatedAt === "string"
              ? parsed.updatedAt
              : new Date().toISOString(),
          source:
            parsed.source === "banner" ||
            parsed.source === "preferences" ||
            parsed.source === "privacy-choices"
              ? parsed.source
              : "preferences",
        };
      } catch (error) {
        return null;
      }
    }

    function writeConsent(nextConsent) {
      var attributes = [
        "Path=/",
        "Max-Age=" + cookieMaxAge,
        "SameSite=Lax",
      ];

      if (window.location.protocol === "https:") {
        attributes.push("Secure");
      }

      try {
        document.cookie =
          cookieName +
          "=" +
          encodeURIComponent(JSON.stringify(nextConsent)) +
          "; " +
          attributes.join("; ");
      } catch (error) {
        // Cookie storage can be unavailable in strict privacy contexts.
      }
    }

    function generateRetargetingId() {
      var bytes = new Uint8Array(retargetingIdLength);
      window.crypto.getRandomValues(bytes);
      var id = "";

      for (var i = 0; i < retargetingIdLength; i++) {
        id += retargetingAlphabet[bytes[i] % retargetingAlphabet.length];
      }

      return id;
    }

    function writeRetargetingCookie() {
      var id = readCookie(retargetingCookieName) || generateRetargetingId();
      var attributes = [
        "Path=/",
        "Max-Age=" + cookieMaxAge,
        "SameSite=Lax",
      ];

      if (window.location.protocol === "https:") {
        attributes.push("Secure");
      }

      document.cookie =
        retargetingCookieName + "=" + id + "; " + attributes.join("; ");
    }

    function expireCookie(name, domain) {
      var domainPart = domain ? "; Domain=" + domain : "";
      document.cookie =
        name + "=; Path=/; Max-Age=0; SameSite=Lax" + domainPart;
    }

    function deleteRetargetingCookie() {
      var host = window.location.hostname;
      var domains = [null, host];

      if (host.indexOf(".") !== -1) {
        domains.push("." + host);
      }

      domains.forEach(function (domain) {
        expireCookie(retargetingCookieName, domain);
      });
    }

    function saveConsent(retargeting, source) {
      var allowRetargeting = retargeting && !gpcEnabled;
      var nextConsent = {
        version: consentVersion,
        necessary: true,
        analytics: true,
        retargeting: allowRetargeting,
        updatedAt: new Date().toISOString(),
        source: source,
      };

      writeConsent(nextConsent);

      if (allowRetargeting) {
        writeRetargetingCookie();
      } else {
        deleteRetargetingCookie();
      }

      consent = nextConsent;
      hidePreferences();

      window.consent_interacted = true;
      window.dispatchEvent(
        new CustomEvent("arraysubs:cookie-consent-updated", {
          detail: nextConsent,
        }),
      );

      if (previousFocus) {
        previousFocus.focus();
      }
    }

    function hidePreferences() {
      preferenceModal.hidden = true;
      document.body.classList.remove("docs-cookie-preferences-visible");
    }

    function showPreferences() {
      previousFocus =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      preferenceModal.hidden = false;
      gpcNotice.hidden = !gpcEnabled;
      document.body.classList.add("docs-cookie-preferences-visible");
      window.setTimeout(function () {
        var focusable = preferenceDialog.querySelectorAll(
          "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
        );

        if (focusable.length) {
          focusable[0].focus();
        }
      }, 0);
    }

    function openPreferences() {
      showPreferences();
    }

    function closePreferences() {
      if (!consent) {
        saveConsent(false, "preferences");
        return;
      }

      hidePreferences();

      if (previousFocus) {
        previousFocus.focus();
      }
    }

    function handlePreferencesKeydown(event) {
      if (event.key === "Escape") {
        closePreferences();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      var focusable = preferenceDialog.querySelectorAll(
        "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
      );

      if (!focusable.length) {
        return;
      }

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    consent = decodeConsent();

    preferenceAcceptButton.addEventListener("click", function () {
      saveConsent(true, "preferences");
    });
    preferenceRejectButton.addEventListener("click", function () {
      saveConsent(false, "preferences");
    });
    preferenceCloseButton.addEventListener("click", closePreferences);
    preferenceDialog.addEventListener("keydown", handlePreferencesKeydown);
    preferenceButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        window.dispatchEvent(new Event("arraysubs:open-cookie-consent"));
      });
    });
    window.addEventListener("arraysubs:open-cookie-consent", openPreferences);

    if (consent) {
      if (consent.retargeting) {
        writeRetargetingCookie();
      } else {
        deleteRetargetingCookie();
      }

      hidePreferences();
      return;
    }

    showPreferences();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSidebarToggle();
    initNavToggles();
    initActiveNavScroll();
    initCopyButtons();
    initTocHighlight();
    initSmoothScroll();
    initReleaseAnnouncement();
    initCookieConsent();
  });
})();
