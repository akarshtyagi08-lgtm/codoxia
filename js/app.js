document.addEventListener("DOMContentLoaded", () => {
  // Add reveal class to cards and hero
  const revealElements = document.querySelectorAll(".hero, .card, .section-title");
  revealElements.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
});
