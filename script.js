(function initMrBlurIn(global) {
  function splitWords(el) {
    if (!el || el.dataset.blurWordsReady === "1") return [];

    const text = el.textContent.trim();
    if (!text) return [];

    const words = text.split(/\s+/);
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

    el.dataset.blurWordsReady = "1";
    return Array.from(el.querySelectorAll(".blur-word"));
  }

  function animateLoad(gsap, element) {
    const wordSpans = splitWords(element);
    if (!wordSpans.length) return;

    gsap.set(element, { visibility: "visible" });
    gsap.fromTo(
      wordSpans,
      { filter: "blur(10px)", opacity: 0, y: "0.15em" },
      {
        filter: "blur(0px)",
        opacity: 1,
        y: "0em",
        duration: 1.8,
        stagger: 0.08,
        ease: "power4.out",
      }
    );
  }

  function animateOnScroll(gsap, ScrollTrigger, element) {
    const wordSpans = splitWords(element);
    if (!wordSpans.length) return;

    const toVars = {
      filter: "blur(0px)",
      opacity: 1,
      y: "0em",
      duration: 2,
      stagger: 0.07,
      ease: "power4.out",
    };

    if (ScrollTrigger) {
      toVars.scrollTrigger = {
        trigger: element,
        start: "top 85%",
        end: "top 40%",
        toggleActions: "play none none none",
        once: true,
      };
    }

    gsap.fromTo(
      wordSpans,
      { filter: "blur(10px)", opacity: 0, y: "0.4em" },
      toVars
    );
  }

  function run() {
    const gsap = global.gsap;
    const ScrollTrigger = global.ScrollTrigger;

    if (!gsap) {
      console.warn("[mr-blur-in] GSAP is required.");
      return;
    }

    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    document.querySelectorAll(".js-blur-words").forEach((el) => animateLoad(gsap, el));
    document.querySelectorAll(".blur-in").forEach((el) => animateOnScroll(gsap, ScrollTrigger, el));
  }

  global.MrBlurIn = {
    init: run,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})(window);
