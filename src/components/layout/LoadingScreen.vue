<template>
  <div class="loading-screen" :class="{ 'is-fading': isFading }">
    <div class="loading-content">
      <div class="loader">
        <div class="loader-line"></div>
        <div class="loader-line"></div>
        <div class="loader-line"></div>
      </div>
      <div class="loading-text">
        <span class="loading-letter" v-for="(letter, index) in 'ABID IBADURRAHMAN'" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
          {{ letter }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["loaded"]);
const isFading = ref(false);

onMounted(() => {
  // Start fading out after 2s
  setTimeout(() => {
    isFading.value = true;

    // Complete loading after the fade animation
    setTimeout(() => {
      emit("loaded");
    }, 1000);
  }, 2000);
});
</script>

<style lang="scss" scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--color-bg);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 1s ease;

  &.is-fading {
    opacity: 0;
  }
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.loader {
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &-line {
    width: 4px;
    height: 36px;
    background-color: var(--color-primary);
    animation: loader 1s ease-in-out infinite;
    border-radius: 4px;

    &:nth-child(2) {
      animation-delay: 0.1s;
    }

    &:nth-child(3) {
      animation-delay: 0.2s;
    }
  }
}

.loading-text {
  display: flex;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 2px;
}

.loading-letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.4s ease forwards;
}

@keyframes loader {
  0%,
  100% {
    height: 15px;
  }
  50% {
    height: 36px;
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
