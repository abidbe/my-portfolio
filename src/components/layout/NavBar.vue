<template>
  <header class="navbar" :class="{ 'is-scrolled': isScrolled }">
    <div class="navbar__container">
      <router-link to="/" class="navbar__logo">
        <div class="logo-text">A<span class="logo-dot">.</span></div>
      </router-link>

      <button class="navbar__toggle" @click="toggleMenu" aria-label="Toggle navigation menu">
        <div class="navbar__toggle-icon" :class="{ 'is-active': isOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <nav class="navbar__menu" :class="{ 'is-open': isOpen }" @click="handleNavLinkClick">
        <ul class="navbar__list">
          <li v-for="item in navItems" :key="item.path" class="navbar__item">
            <router-link :to="item.path" class="navbar__link" :class="{ 'is-active': route.path === item.path }" @click="closeMenu">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  transparent: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle-nav"]);
const isOpen = ref(false);
const isScrolled = ref(false);
const route = useRoute();

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  emit("toggle-nav", isOpen.value);

  // Prevent scrolling when menu is open
  if (isOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMenu = () => {
  if (isOpen.value) {
    isOpen.value = false;
    emit("toggle-nav", false);
    document.body.style.overflow = "";
  }
};

const handleNavLinkClick = (e) => {
  // Only close if we actually clicked a link
  if (e.target.tagName.toLowerCase() === "a") {
    closeMenu();
  }
};

const checkScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Watch for route changes to close menu
watch(
  () => route.path,
  () => {
    closeMenu();
  }
);

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Initial check
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: all 0.3s ease;

  &.is-scrolled {
    background-color: rgba(10, 10, 10, 0.95);
    padding: 1rem 0;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
  }

  &__logo {
    display: flex;
    align-items: center;
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 2rem;
    color: var(--color-text);
    z-index: 100;

    .logo-text {
      position: relative;
    }

    .logo-dot {
      color: var(--color-accent);
    }
  }

  &__toggle {
    display: block;
    background: transparent;
    border: none;
    z-index: 100;

    @media (min-width: 768px) {
      display: none;
    }
  }

  &__toggle-icon {
    width: 30px;
    height: 24px;
    position: relative;

    span {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: var(--color-text);
      border-radius: 2px;
      transition: all 0.3s ease;

      &:nth-child(1) {
        top: 0;
      }

      &:nth-child(2) {
        top: 50%;
        transform: translateY(-50%);
      }

      &:nth-child(3) {
        bottom: 0;
      }
    }

    &.is-active {
      span:nth-child(1) {
        transform: translateY(11px) rotate(45deg);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:nth-child(3) {
        transform: translateY(-11px) rotate(-45deg);
      }
    }
  }

  &__menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--color-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

    &.is-open {
      transform: translateX(0);
    }

    @media (min-width: 768px) {
      position: static;
      width: auto;
      height: auto;
      background-color: transparent;
      transform: none;
      transition: none;
    }
  }

  &__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0;

    @media (min-width: 768px) {
      flex-direction: row;
      gap: 3rem;
    }
  }

  &__item {
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }
  }

  &__link {
    font-size: 2rem;
    color: var(--color-text);
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;

    &:hover,
    &.is-active {
      color: var(--color-primary);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--color-primary);
      transition: width 0.3s ease;
    }

    &:hover::after,
    &.is-active::after {
      width: 100%;
    }

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }
}
</style>
