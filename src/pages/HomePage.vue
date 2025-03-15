<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__bg">
        <div ref="particlesContainer" class="hero__particles"></div>
      </div>

      <div class="container">
        <div class="hero__content">
          <h1 ref="heroTitleRef" class="hero__title">
            <span class="hero__greet">Hello, I'm</span>
            <span class="hero__name">{{ personal.name }}</span>
            <div class="hero__profession">
              <span ref="professionRef"></span>
              <span class="hero__cursor">|</span>
            </div>
          </h1>

          <p class="hero__tagline animate animate-from-bottom">
            {{ personal.tagline }}
          </p>

          <div class="hero__buttons animate animate-from-bottom">
            <router-link to="/portfolio" class="btn btn--primary"> View My Work </router-link>
            <router-link to="/contact" class="btn"> Get In Touch </router-link>
          </div>

          <div class="hero__scroll animate">
            <span>Scroll Down</span>
            <div class="hero__scroll-indicator"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="section featured-projects">
      <div class="container">
        <SectionTitle prefix="Selected Work" alignment="center"> Featured Projects </SectionTitle>

        <div class="featured-projects__grid">
          <div v-for="project in featuredProjects" :key="project.id" class="featured-projects__item animate">
            <ProjectCard :project="project" />
          </div>
        </div>

        <div class="featured-projects__more animate">
          <router-link to="/portfolio" class="btn"> View All Projects </router-link>
        </div>
      </div>
    </section>

    <!-- Skills Overview -->
    <section class="section skills-overview">
      <div class="container">
        <SectionTitle prefix="My Expertise" alignment="center"> Skills & Technologies </SectionTitle>

        <div class="skills-overview__grid">
          <div v-for="(category, index) in about.skills" :key="index" class="skills-overview__category animate" :class="`animate-delay-${index * 2}`">
            <h3 class="skills-overview__category-title">{{ category.category }}</h3>
            <div class="skills-overview__items">
              <div v-for="(skill, skillIndex) in category.items" :key="skillIndex" class="skills-overview__item">
                {{ skill.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Contact -->
    <section class="section quick-contact">
      <div class="container">
        <div class="quick-contact__content animate">
          <h2 class="quick-contact__title">Let's Work Together</h2>
          <p class="quick-contact__text">Have a project in mind? I'm always open to discussing new opportunities and ideas.</p>
          <router-link to="/contact" class="btn btn--primary"> Get In Touch </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { useDataStore } from "../stores/dataStore";
import { useScrollAnimation } from "../composables/useScrollAnimation";
import SectionTitle from "../components/ui/SectionTitle.vue";
import ProjectCard from "../components/ui/ProjectCard.vue";
import gsap from "gsap";
import * as THREE from "three";

const dataStore = useDataStore();
const { personal, about } = dataStore;
const { initAnimations } = useScrollAnimation();

// Refs
const heroTitleRef = ref(null);
const professionRef = ref(null);
const particlesContainer = ref(null);

// Computed
const featuredProjects = computed(() => {
  return dataStore.projects.filter((project) => project.featured);
});

// Type animation for profession
let typewriterInterval = null;
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

const typeWriter = () => {
  if (!professionRef.value) return;

  const currentProfession = personal.profession[professionIndex];

  if (isDeleting) {
    professionRef.value.textContent = currentProfession.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    professionRef.value.textContent = currentProfession.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentProfession.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    professionIndex = (professionIndex + 1) % personal.profession.length;
    typeSpeed = 500; // Pause before typing next profession
  }

  setTimeout(typeWriter, typeSpeed);
};

// Particles background
let particlesScene, particlesCamera, particlesRenderer, particles;
let handleResize;

const initParticles = () => {
  if (!particlesContainer.value) return;

  // Scene setup
  particlesScene = new THREE.Scene();

  // Camera setup
  const { width, height } = particlesContainer.value.getBoundingClientRect();
  particlesCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  particlesCamera.position.z = 5;

  // Renderer setup
  particlesRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  particlesRenderer.setSize(width, height);
  particlesRenderer.setPixelRatio(window.devicePixelRatio);
  particlesContainer.value.appendChild(particlesRenderer.domElement);

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1000;

  const positions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 3) {
    // Positions
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;

    // Colors
    colors[i] = Math.random();
    colors[i + 1] = Math.random();
    colors[i + 2] = Math.random();
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    transparent: true,
    opacity: 0.8,
    vertexColors: true,
    sizeAttenuation: true,
  });

  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  particlesScene.add(particles);

  // Animation
  const animateParticles = () => {
    requestAnimationFrame(animateParticles);

    particles.rotation.x += 0.001;
    particles.rotation.y += 0.001;

    particlesRenderer.render(particlesScene, particlesCamera);
  };

  animateParticles();

  // Resize handler
  handleResize = () => {
    const { width, height } = particlesContainer.value.getBoundingClientRect();
    particlesCamera.aspect = width / height;
    particlesCamera.updateProjectionMatrix();
    particlesRenderer.setSize(width, height);
  };

  window.addEventListener("resize", handleResize);
};

onMounted(() => {
  // Initialize animations
  initAnimations();

  // Start typewriter effect
  setTimeout(typeWriter, 1000);

  // Initialize particles
  initParticles();

  // Hero title animation
  if (heroTitleRef.value) {
    gsap.from(heroTitleRef.value.querySelectorAll(".hero__greet, .hero__name, .hero__profession"), {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.5,
    });
  }
});

onBeforeUnmount(() => {
  // Clean up
  if (particlesRenderer && particlesContainer.value) {
    particlesContainer.value.removeChild(particlesRenderer.domElement);
    particlesRenderer.dispose();
  }

  if (handleResize) {
    window.removeEventListener("resize", handleResize);
  }
});
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  &__particles {
    width: 100%;
    height: 100%;
  }

  &__content {
    max-width: 800px;
    z-index: 1;
    padding: 2rem;
  }

  &__title {
    margin-bottom: 2rem;
  }

  &__greet {
    display: block;
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    color: var(--color-text-dim);
  }

  &__name {
    display: block;
    font-size: 4rem;
    font-weight: 700;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
      font-size: 5.5rem;
    }
  }

  &__profession {
    display: flex;
    font-size: 2rem;
    font-weight: 500;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  &__cursor {
    margin-left: 5px;
    animation: blink 1s infinite;
  }

  &__tagline {
    font-size: 1.25rem;
    max-width: 600px;
    margin-bottom: 2.5rem;
    color: var(--color-text-dim);

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &__buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 4rem;

    .btn {
      padding: 0.75rem 1.5rem;

      @media (min-width: 768px) {
        padding: 1rem 2rem;
      }
    }
  }

  &__scroll {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--color-text-dim);
    font-size: 0.875rem;

    span {
      margin-bottom: 0.5rem;
    }
  }

  &__scroll-indicator {
    width: 1.5px;
    height: 50px;
    background-color: var(--color-text-dim);
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      background-color: var(--color-primary);
      animation: scrollIndicator 2s ease infinite;
    }
  }
}

.featured-projects {
  background-color: var(--color-bg-alt);

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__more {
    text-align: center;
  }
}

.skills-overview {
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__category {
    background-color: var(--color-bg-alt);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    }
  }

  &__category-title {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    color: var(--color-primary);
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 40px;
      height: 2px;
      background-color: var(--color-primary);
    }
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  &__item {
    padding: 0.5rem 0.75rem;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    font-size: 0.875rem;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-bg);
    }
  }
}

.quick-contact {
  background: var(--gradient-primary);
  text-align: center;
  padding: 5rem 0;

  &__content {
    max-width: 700px;
    margin: 0 auto;
  }

  &__title {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    color: var(--color-bg);
  }

  &__text {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    color: rgba(0, 0, 0, 0.8);
  }

  .btn {
    background-color: var(--color-bg);
    color: rgb(44, 44, 44);
    padding: 1rem 2.5rem;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@keyframes scrollIndicator {
  0% {
    top: -50%;
  }
  100% {
    top: 100%;
  }
}

// Animation delay utilities
.animate-delay-0 {
  animation-delay: 0s;
}
.animate-delay-2 {
  animation-delay: 0.2s;
}
.animate-delay-4 {
  animation-delay: 0.4s;
}
.animate-delay-6 {
  animation-delay: 0.6s;
}
.animate-delay-8 {
  animation-delay: 0.8s;
}
</style>
