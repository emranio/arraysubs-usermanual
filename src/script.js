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

  function initCopyButtons() {
    document.querySelectorAll(".docs-content pre").forEach(function (pre) {
      if (pre.querySelector(".docs-copy-button")) {
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

  function initThemeToggle() {
    var button = document.querySelector("[data-theme-toggle]");

    if (!button) {
      return;
    }

    function setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("docs-theme", theme);

      var meta = document.querySelector('meta[name="theme-color"]');

      if (meta) {
        meta.content = theme === "dark" ? "#0b0e14" : "#f8fafc";
      }
    }

    button.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSidebarToggle();
    initNavToggles();
    initCopyButtons();
    initTocHighlight();
    initSmoothScroll();
    initThemeToggle();
  });
})();
