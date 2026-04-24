(function initMrBlurIn(global) {
  function splitWords(el) {
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

    return el.querySelectorAll(".blur-word");
  }

  function runLoadBlurWords() {
    const gsap = global.gsap;
    if (!gsap) {
      console.warn("[mr-blur-in] GSAP is required.");
      return;
    }

    document.querySelectorAll(".js-blur-words").forEach((el) => {
      const wordSpans = splitWords(el);

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
  }

  function runScrollBlurWords() {
    const gsap = global.gsap;
    const ScrollTrigger = global.ScrollTrigger;
    if (!gsap) {
      console.warn("[mr-blur-in] GSAP is required.");
      return;
    }
    if (!ScrollTrigger) {
      console.warn("[mr-blur-in] ScrollTrigger is required for .blur-in.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".blur-in").forEach((el) => {
      const wordSpans = splitWords(el);

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
  }

  function run() {
    runLoadBlurWords();
    runScrollBlurWords();
  }

  global.MrBlurIn = {
    init: run,
    initLoad: runLoadBlurWords,
    initScroll: runScrollBlurWords,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})(window);
