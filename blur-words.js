function runWhenFontsReady(callback) {
  const start = () => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => requestAnimationFrame(callback))
        .catch(() => requestAnimationFrame(callback));
      return;
    }
    requestAnimationFrame(callback);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
}

runWhenFontsReady(() => {
  document.querySelectorAll(".js-blur-words").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);

    el.textContent = "";

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.className = "blur-word";
      span.textContent = word;
      el.appendChild(span);

      if (index < words.length - 1) {
        el.appendChild(document.createTextNode(" "));
      }
    });

    const wordSpans = el.querySelectorAll(".blur-word");

    gsap.set(el, { visibility: "visible" });

    gsap.fromTo(
      wordSpans,
      {
        filter: "blur(10px)",
        opacity: 0,
        y: "0.15em",
      },
      {
        filter: "blur(0px)",
        opacity: 1,
        y: "0em",
        duration: 1.8,
        stagger: 0.08,
        ease: "power4.out",
      }
    );
  });
});

runWhenFontsReady(() => {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".blur-in").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);

    el.textContent = "";

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.className = "blur-word";
      span.textContent = word;
      el.appendChild(span);

      if (index < words.length - 1) {
        el.appendChild(document.createTextNode(" "));
      }
    });

    const wordSpans = el.querySelectorAll(".blur-word");

    gsap.fromTo(
      wordSpans,
      {
        filter: "blur(10px)",
        opacity: 0,
        y: "0.4em",
      },
      {
        filter: "blur(0px)",
        opacity: 1,
        y: "0em",
        duration: 2,
        stagger: 0.07,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 40%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  });
});
