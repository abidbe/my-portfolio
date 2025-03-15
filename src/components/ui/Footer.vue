<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <div class="footer__logo">
          <router-link to="/" class="footer__logo-link">
            <div class="logo-text">A<span class="logo-dot">.</span></div>
          </router-link>
        </div>

        <div class="footer__navigation">
          <nav class="footer__nav">
            <ul class="footer__nav-list">
              <li v-for="item in navItems" :key="item.path" class="footer__nav-item">
                <router-link :to="item.path" class="footer__nav-link">
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="footer__social">
          <a v-for="social in contact.socialMedia" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer" class="footer__social-link" :aria-label="social.name">
            <span>{{ social.icon }}</span>
          </a>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">&copy; {{ new Date().getFullYear() }} Abid Ibadurrahman. All rights reserved.</p>
        <p class="footer__credit">Designed and built with <span class="heart">❤</span></p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useDataStore } from "../../stores/dataStore";

const dataStore = useDataStore();
const { contact } = dataStore;

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];
</script>

<style lang="scss" scoped>
.footer {
  background-color: var(--color-bg-alt);
  padding: 4rem 0 2rem;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__logo {
    .logo-text {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 2rem;
      color: var(--color-text);

      .logo-dot {
        color: var(--color-accent);
      }
    }
  }

  &__nav-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    list-style: none;
    padding: 0;
  }

  &__nav-link {
    color: var(--color-text);
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-primary);
    }
  }

  &__social {
    display: flex;
    gap: 1rem;
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(97, 218, 251, 0.1);
    border-radius: 50%;
    transition: all 0.3s ease;
    color: var(--color-text);

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-bg);
      transform: translateY(-5px);
    }
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-border);

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  &__copyright,
  &__credit {
    font-size: 0.875rem;
    color: var(--color-text-dim);
  }

  .heart {
    color: #e25555;
    display: inline-block;
    animation: heartbeat 1.5s infinite;
  }
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>
