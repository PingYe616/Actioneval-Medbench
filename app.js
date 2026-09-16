(() => {
  const toast = document.querySelector(".toast");
  const copyButton = document.querySelector("[data-copy-target]");

  const showToast = () => {
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 1800);
  };

  copyButton?.addEventListener("click", async () => {
    const target = document.getElementById(copyButton.dataset.copyTarget);
    if (!target) return;
    const value = target.innerText.replace(/\u00a0/g, " ");
    try {
      await navigator.clipboard.writeText(value);
      showToast();
    } catch {
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      showToast();
    }
  });

  const resultTabs = [...document.querySelectorAll(".result-tab")];
  const resultViews = [...document.querySelectorAll(".result-view")];
  resultTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const view = tab.dataset.view;
      resultTabs.forEach((item) => item.classList.toggle("active", item === tab));
      resultViews.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === view));
    });
  });

  const navLinks = [...document.querySelectorAll(".topnav a")];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const setActive = (id) => navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-25% 0px -65% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }
})();
