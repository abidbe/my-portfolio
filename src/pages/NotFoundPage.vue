<template>
  <div class="not-found">
    <div class="container">
      <div class="not-found__content animate">
        <h1 class="not-found__title">404</h1>
        <h2 class="not-found__subtitle">Page Not Found</h2>
        <p class="not-found__text">The page you're looking for doesn't exist or has been moved.</p>
        <router-link to="/" class="btn btn--primary"> Back to Home </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useScrollAnimation } from "../composables/useScrollAnimation";

const { initAnimations } = useScrollAnimation();

onMounted(() => {
  initAnimations();
});
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 0;

  &__content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  &__title {
    font-size: 10rem;
    line-height: 1;
    margin-bottom: 0;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;

    @media (max-width: 768px) {
      font-size: 6rem;
    }
  }

  &__subtitle {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  &__text {
    font-size: 1.25rem;
    color: var(--color-text-dim);
    margin-bottom: 2.5rem;
  }
}
</style>
