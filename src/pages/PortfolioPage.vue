<template>
  <div class="portfolio-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header animate">
        <h1 class="page-title">My Portfolio</h1>
        <p class="page-subtitle">A showcase of my projects and creative work</p>
      </div>

      <!-- Filter Buttons -->
      <div class="filter-container animate">
        <button v-for="category in categories" :key="category" class="filter-btn" :class="{ 'is-active': activeCategory === category }" @click="setCategory(category)">
          {{ category }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-container">
        <TransitionGroup name="projects" tag="div" class="projects-grid">
          <div v-for="project in filteredProjects" :key="project.id" class="project-item animate">
            <ProjectCard :project="project" />
          </div>
        </TransitionGroup>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="empty-state animate">
        <p>No projects found in this category.</p>
        <button class="btn" @click="setCategory('All')">Show All Projects</button>
      </div>

      <!-- Contact CTA -->
      <div class="contact-cta animate">
        <h2 class="contact-cta__title">Have a project in mind?</h2>
        <p class="contact-cta__description">Let's collaborate to bring your ideas to life with creative solutions.</p>
        <router-link to="/contact" class="btn btn--primary"> Get in Touch </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDataStore } from "../stores/dataStore";
import { useScrollAnimation } from "../composables/useScrollAnimation";
import ProjectCard from "../components/ui/ProjectCard.vue";

const dataStore = useDataStore();
const { initAnimations } = useScrollAnimation();

// Active category for filtering
const activeCategory = ref("All");

// Get unique categories from projects
const categories = computed(() => {
  const cats = ["All", ...new Set(dataStore.projects.map((p) => p.category))];
  return cats;
});

// Filter projects by category
const filteredProjects = computed(() => {
  if (activeCategory.value === "All") {
    return dataStore.projects;
  }

  return dataStore.projects.filter((p) => p.category === activeCategory.value);
});

// Set active category
const setCategory = (category) => {
  activeCategory.value = category;
};

onMounted(() => {
  initAnimations();
});
</script>

<style lang="scss" scoped>
.portfolio-page {
  padding: 8rem 0 4rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;

  .page-title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .page-subtitle {
    font-size: 1.25rem;
    color: var(--color-text-dim);
    max-width: 600px;
    margin: 0 auto;
  }
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.filter-btn {
  background-color: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: 30px;
  padding: 0.6rem 1.5rem;
  font-size: 0.9rem;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--color-primary);
  }

  &.is-active {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-bg);
  }
}

// Container untuk grid yang memastikan layout stabil
.projects-container {
  position: relative;
  min-height: 200px;
  margin-bottom: 4rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-item {
  position: relative;
  transform-origin: center;
  backface-visibility: hidden;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  margin-bottom: 4rem;
  background-color: var(--color-bg-alt);
  border-radius: 8px;

  p {
    margin-bottom: 1.5rem;
    color: var(--color-text-dim);
  }
}

.contact-cta {
  text-align: center;
  background-color: var(--color-bg-alt);
  border-radius: 8px;
  padding: 4rem 2rem;
  margin-bottom: 2rem;

  &__title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  &__description {
    font-size: 1.1rem;
    color: var(--color-text-dim);
    max-width: 600px;
    margin: 0 auto 2rem;
  }

  .btn {
    padding: 1rem 2.5rem;
    font-size: 1rem;
  }
}

.projects-leave-active {
  position: absolute;
  width: 100%;
  opacity: 0;
  z-index: -1;
  transition: none !important;
}

.projects-enter-active {
  transition: opacity 0.25s ease;
}

.projects-enter-from {
  opacity: 0;
}

.projects-move {
  transition: transform 0.4s ease-out;
}
</style>
