<template>
  <div class="app-container" :class="{ 'nav-open': isNavOpen }">
    <NavBar @toggle-nav="toggleNav" />
    <div class="page-transition-wrapper" v-if="!isLoading">
      <router-view v-slot="{ Component }">
        <transition :css="false" mode="out-in" @enter="(el, done) => onEnter(el, done)" @leave="(el, done) => onLeave(el, done)">
          <component :is="Component" :key="route.fullPath" :skipAnimation="true" />
        </transition>
      </router-view>
    </div>
    <Cursor />
    <LoadingScreen v-if="isLoading" @loaded="finishLoading" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";
import NavBar from "./components/layout/NavBar.vue";
import Cursor from "./components/ui/Cursor.vue";
import LoadingScreen from "./components/layout/LoadingScreen.vue";

const isNavOpen = ref(false);
const isLoading = ref(true);
const route = useRoute();

// Fungsi transisi halaman dengan inline function
const onEnter = (el, done) => {
  // Reset scroll ke atas halaman
  window.scrollTo(0, 0);

  gsap.fromTo(
    el,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      onComplete: done,
    }
  );
};

const onLeave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power2.in",
    onComplete: done,
  });
};

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

const finishLoading = () => {
  // Setelah loading selesai, tampilkan konten utama
  isLoading.value = false;
};

// Watch untuk menutup menu navigasi saat berpindah halaman
watch(
  () => route.path,
  () => {
    isNavOpen.value = false;
  }
);
</script>

<style lang="scss">
.app-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

.page-transition-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
</style>
