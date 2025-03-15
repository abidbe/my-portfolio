import { onMounted, onBeforeUnmount, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  let scrollTriggers = [];

  const animateFrom = (elem, direction) => {
    direction = direction || 1;

    let x = 0,
      y = direction * 100;

    if (elem.classList.contains("animate-from-left")) {
      x = -100;
      y = 0;
    } else if (elem.classList.contains("animate-from-right")) {
      x = 100;
      y = 0;
    }

    elem.style.transform = `translate(${x}px, ${y}px)`;
    elem.style.opacity = "0";

    gsap.fromTo(
      elem,
      { x, y, autoAlpha: 0 },
      {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo.out",
        overwrite: "auto",
      }
    );
  };

  const hide = (elem) => {
    gsap.set(elem, { autoAlpha: 0 });
  };

  const initAnimations = (skipInitialAnimation = false) => {
    // Get all elements with the .animate class
    const animatedElements = document.querySelectorAll(".animate");

    // Clean up existing ScrollTriggers first
    killAllScrollTriggers();

    // If skipInitialAnimation is true, just make elements visible without animation
    if (skipInitialAnimation) {
      animatedElements.forEach((el) => {
        gsap.set(el, { autoAlpha: 1, x: 0, y: 0 });
      });
      return;
    }

    animatedElements.forEach((el) => {
      hide(el);

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top bottom-=100",
        end: "bottom top",
        once: true,
        onEnter: () => animateFrom(el),
        markers: false,
      });

      // Store triggers for cleanup
      scrollTriggers.push(trigger);
    });

    // Call animateSectionTitles if not skipping animations
    if (!skipInitialAnimation) {
      animateSectionTitles();
    } else {
      // Just make section titles visible without animation
      const titles = document.querySelectorAll(".section-title");
      titles.forEach((title) => {
        const spans = title.querySelectorAll("span");
        if (spans.length) {
          gsap.set(spans, { autoAlpha: 1, y: 0 });
        } else {
          // If title hasn't been processed yet, make the whole title visible
          gsap.set(title, { autoAlpha: 1 });
        }
      });
    }
  };

  // Animated section titles
  const animateSectionTitles = () => {
    const titles = document.querySelectorAll(".section-title");

    titles.forEach((title) => {
      const chars = title.textContent.split("");
      title.textContent = "";

      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        title.appendChild(span);
      });

      const spans = title.querySelectorAll("span");

      gsap.set(spans, { autoAlpha: 0, y: 30 });

      const trigger = ScrollTrigger.create({
        trigger: title,
        start: "top bottom-=100",
        end: "bottom top",
        once: true,
        onEnter: () => {
          gsap.to(spans, {
            duration: 0.8,
            autoAlpha: 1,
            y: 0,
            stagger: 0.03,
            ease: "elastic.out(1, 0.3)",
          });
        },
      });

      // Store triggers for cleanup
      scrollTriggers.push(trigger);
    });
  };

  // Kill all ScrollTrigger instances
  const killAllScrollTriggers = () => {
    scrollTriggers.forEach((trigger) => {
      if (trigger) {
        trigger.kill();
      }
    });
    scrollTriggers = [];
  };

  onBeforeUnmount(() => {
    // Kill all ScrollTrigger instances
    killAllScrollTriggers();
  });

  return {
    animateFrom,
    hide,
    initAnimations,
    animateSectionTitles,
    killAllScrollTriggers,
  };
}
