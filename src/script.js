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
    const headings = document.querySelectorAll(
      ".docs-content h2[id], .docs-content h3[id]",
    );
    const tocLinks = document.querySelectorAll("[data-toc-link]");

    if (
      !headings.length ||
      !tocLinks.length ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const linkMap = new Map();
    tocLinks.forEach(function (link) {
      linkMap.set(link.getAttribute("href").replace(/^#/, ""), link);
    });

    const setActive = function (id) {
      tocLinks.forEach(function (link) {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${id}`,
        );
      });
    };

    const observer = new IntersectionObserver(
      function (entries) {
        const visible = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (left, right) {
            return left.boundingClientRect.top - right.boundingClientRect.top;
          });

        if (!visible.length) {
          return;
        }

        const currentId = visible[0].target.id;

        if (linkMap.has(currentId)) {
          setActive(currentId);
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: [0, 1],
      },
    );

    headings.forEach(function (heading) {
      observer.observe(heading);
    });
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

  document.addEventListener("DOMContentLoaded", function () {
    initSidebarToggle();
    initNavToggles();
    initCopyButtons();
    initTocHighlight();
    initSmoothScroll();
  });
})();
