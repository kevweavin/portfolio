(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const onScroll = () =>
    header?.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle?.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links?.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    }),
  );

  // Subtle portrait tilt follows pointer movement on larger screens.

  // The hero's existing grid pattern subtly shifts with pointer movement.
  const hero = document.querySelector(".hero");
  if (hero && window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener(
      "pointermove",
      (event) => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        hero.style.setProperty("--pattern-x", `${x * -18}px`);
        hero.style.setProperty("--pattern-y", `${y * -18}px`);
        hero.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
        hero.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
      },
      { passive: true },
    );
    hero.addEventListener("pointerleave", () => {
      hero.style.setProperty("--pattern-x", "0px");
      hero.style.setProperty("--pattern-y", "0px");
      hero.style.setProperty("--pointer-x", "50%");
      hero.style.setProperty("--pointer-y", "50%");
    });
  }

  const visual = document.querySelector("#heroVisual");
  const portrait = document.querySelector(".portrait-frame");
  if (visual && portrait && window.matchMedia("(pointer:fine)").matches) {
    visual.addEventListener("mousemove", (event) => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      portrait.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 7}deg) translate3d(${x * 5}px,${y * 5}px,0)`;
    });
    visual.addEventListener(
      "mouseleave",
      () => (portrait.style.transform = ""),
    );
  }

  // Soft cursor light, disabled on touch devices.
  const glow = document.querySelector(".cursor-glow");
  if (glow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener(
      "pointermove",
      (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      },
      { passive: true },
    );
  } else if (glow) glow.remove();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(
      ".about-grid, .service-item, .project-card, .section-heading, .toolkit, .toolkit-section, .experience-item, .contact-inner",
    )
    .forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
})();

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("lightboxModal");
  const modalImg = document.getElementById("lightboxImg");
  const closeBtn = document.querySelector(".lightbox-close");
  const lightboxTriggers = document.querySelectorAll(".project-lightbox");

  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const imgSrc = trigger.getAttribute("href");
      modalImg.src = imgSrc;
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("lightboxModal");
  const modalImg = document.getElementById("lightboxImg");
  const closeBtn = document.querySelector(".lightbox-close");
  const lightboxTriggers = document.querySelectorAll(".project-lightbox");

  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      // Find the image element inside the clicked project card and get its source
      const img = trigger.querySelector(".project-image img");
      if (img) {
        const imgSrc = img.getAttribute("src");
        modalImg.src = imgSrc;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modalImg.removeAttribute("src");
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});
