(function () {
  "use strict";

  // Make the current primary navigation item clear for assistive technology.
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".primary-navigation a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href === currentPath) link.setAttribute("aria-current", "page");
  });


  // Accessible in-page tabs. Hashes allow direct links to a specific section.
  const tabGroups = document.querySelectorAll('[role="tablist"]');
  tabGroups.forEach((tabList) => {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"][data-tab-target]'));
    if (!tabs.length) return;

    const activateTab = (tab, updateHash) => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(item.dataset.tabTarget);
        if (panel) panel.hidden = !selected;
      });
      if (updateHash && tab.dataset.tabTarget && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + encodeURIComponent(tab.dataset.tabTarget));
      }
    };

    tabs.forEach((tab, index) => {
      tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
      tab.addEventListener('click', () => activateTab(tab, true));
      tab.addEventListener('keydown', (event) => {
        let nextIndex = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex !== null) {
          event.preventDefault();
          tabs[nextIndex].focus();
          activateTab(tabs[nextIndex], true);
        }
      });
    });

    const hashTarget = decodeURIComponent(window.location.hash.replace(/^#/, ''));
    const linkedTab = tabs.find((tab) => tab.dataset.tabTarget === hashTarget);
    if (linkedTab) {
      activateTab(linkedTab, false);
      // When arriving from an old child-page URL, bring the tabs into view.
      window.requestAnimationFrame(() => tabList.scrollIntoView({ block: 'start', behavior: 'auto' }));
    }
  });

  // Client-side required-field check for a clearer message before form submission.
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  }
})();
