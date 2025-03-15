<template>
  <div class="cursor-container">
    <div
      ref="cursorRef"
      class="cursor"
      :class="{
        'cursor--hover': isHovering,
        'cursor--click': isClicking,
      }"
    ></div>
    <div
      ref="cursorFollowerRef"
      class="cursor-follower"
      :class="{
        'cursor-follower--hover': isHovering,
        'cursor-follower--click': isClicking,
      }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";

const cursorRef = ref(null);
const cursorFollowerRef = ref(null);
const isHovering = ref(false);
const isClicking = ref(false);

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;

const updateCursor = () => {
  posX += (mouseX - posX) * 0.2;
  posY += (mouseY - posY) * 0.2;

  if (cursorRef.value && cursorFollowerRef.value) {
    gsap.set(cursorRef.value, {
      x: mouseX,
      y: mouseY,
    });

    gsap.set(cursorFollowerRef.value, {
      x: posX - 10,
      y: posY - 10,
    });
  }

  requestAnimationFrame(updateCursor);
};

const onMouseMove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

const onMouseDown = () => {
  isClicking.value = true;

  setTimeout(() => {
    isClicking.value = false;
  }, 300);
};

const onMouseEnterLink = () => {
  isHovering.value = true;
};

const onMouseLeaveLink = () => {
  isHovering.value = false;
};

const bindHoverEvents = () => {
  const links = document.querySelectorAll('a, button, input, textarea, [role="button"]');

  links.forEach((link) => {
    link.addEventListener("mouseenter", onMouseEnterLink);
    link.addEventListener("mouseleave", onMouseLeaveLink);
  });
};

const unbindHoverEvents = () => {
  const links = document.querySelectorAll('a, button, input, textarea, [role="button"]');

  links.forEach((link) => {
    link.removeEventListener("mouseenter", onMouseEnterLink);
    link.removeEventListener("mouseleave", onMouseLeaveLink);
  });
};

onMounted(() => {
  // Only use custom cursor on desktop
  if (window.innerWidth > 1024) {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);

    bindHoverEvents();
    updateCursor();

    // Add mutation observer to handle dynamically added elements
    const observer = new MutationObserver(() => {
      unbindHoverEvents();
      bindHoverEvents();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
});

onBeforeUnmount(() => {
  if (window.innerWidth > 1024) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mousedown", onMouseDown);
    unbindHoverEvents();
  }
});
</script>

<style lang="scss" scoped>
.cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  mix-blend-mode: difference;
}

.cursor {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, background-color 0.3s;
  z-index: 10000;

  &--hover {
    width: 12px;
    height: 12px;
    background-color: var(--color-primary);
  }

  &--click {
    transform: translate(-50%, -50%) scale(0.8);
  }
}

.cursor-follower {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1), height 0.6s cubic-bezier(0.16, 1, 0.3, 1), border 0.4s;

  &--hover {
    width: 50px;
    height: 50px;
    border-color: var(--color-primary);
    border-width: 2px;
  }

  &--click {
    width: 100px;
    height: 100px;
    border-color: rgba(255, 255, 255, 0.1);
  }
}

@media (max-width: 1024px) {
  .cursor-container {
    display: none;
  }
}
</style>
