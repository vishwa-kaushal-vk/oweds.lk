(function () {
  "use strict";

  // Mark the current navigation link for screen readers and visual styling.
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".primary-navigation a[href]").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });

  // Accessible tabs: mouse, keyboard arrows and direct links via URL hashes.
  document.querySelectorAll('[role="tablist"]').forEach((tabList) => {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"][data-tab-target]'));
    if (!tabs.length) return;

    const activateTab = (selectedTab, updateHash) => {
      tabs.forEach((tab) => {
        const selected = tab === selectedTab;
        tab.classList.toggle("active", selected);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;

        const panel = document.getElementById(tab.dataset.tabTarget);
        if (panel) panel.hidden = !selected;
      });

      if (updateHash && selectedTab.dataset.tabTarget) {
        window.history.replaceState(null, "", `#${encodeURIComponent(selectedTab.dataset.tabTarget)}`);
      }
    };

    tabs.forEach((tab, index) => {
      tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
      tab.addEventListener("click", () => activateTab(tab, true));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;

        if (nextIndex !== null) {
          event.preventDefault();
          tabs[nextIndex].focus();
          activateTab(tabs[nextIndex], true);
        }
      });
    });

    const hashTarget = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    const linkedTab = tabs.find((tab) => tab.dataset.tabTarget === hashTarget);
    if (linkedTab) {
      activateTab(linkedTab, false);
      window.requestAnimationFrame(() => tabList.scrollIntoView({ block: "start", behavior: "auto" }));
    }
  });

  // Shared Read more / Read less control for About, Solutions and News sections.
  document.querySelectorAll("[data-read-more]").forEach((button) => {
    const panelId = button.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;

    const label = button.childNodes[0];
    const icon = button.querySelector(".read-more-toggle__icon");

    button.addEventListener("click", () => {
      const willExpand = panel.hidden;
      panel.hidden = !willExpand;
      button.setAttribute("aria-expanded", String(willExpand));

      if (label && label.nodeType === Node.TEXT_NODE) {
        label.textContent = willExpand ? "Read less " : "Read more ";
      } else {
        button.textContent = willExpand ? "Read less" : "Read more";
      }
      if (icon) icon.textContent = willExpand ? "−" : "+";
    });
  });

  // Client-side required-field validation for the contact form.
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  }
})();
