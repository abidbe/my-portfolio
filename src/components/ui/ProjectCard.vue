<template>
  <div class="project-card">
    <div class="project-card__image">
      <img :src="project.image || '/images/project-placeholder.jpg'" :alt="project.title" />
      <div class="project-card__overlay">
        <div class="project-card__links">
          <a v-if="project.link" :href="project.link" target="_blank" rel="noopener" class="project-card__link">
            <span class="icon">↗</span>
            <span>Live Demo</span>
          </a>
          <a v-if="project.github" :href="project.github" target="_blank" rel="noopener" class="project-card__link">
            <span class="icon">⌨</span>
            <span>Source Code</span>
          </a>
        </div>
      </div>
    </div>
    <div class="project-card__content">
      <h3 class="project-card__title">{{ project.title }}</h3>
      <p class="project-card__description">{{ project.description }}</p>
      <div class="project-card__tech">
        <span v-for="(tech, index) in project.technologies" :key="index" class="project-card__tech-item">
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.project-card {
  height: 100%;
  background-color: var(--color-bg-alt);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-10px);

    .project-card__overlay {
      opacity: 1;
    }

    .project-card__image img {
      transform: scale(1.05);
    }
  }

  &__image {
    position: relative;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s ease;
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &__links {
    display: flex;
    gap: 1rem;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--color-bg);
    border-radius: 4px;
    color: var(--color-text);
    font-size: 0.875rem;
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-bg);
    }

    .icon {
      font-size: 1rem;
    }
  }

  &__content {
    padding: 1.5rem;
  }

  &__title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  &__description {
    font-size: 0.9rem;
    color: var(--color-text-dim);
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  &__tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__tech-item {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background-color: rgba(97, 218, 251, 0.1);
    color: var(--color-primary);
    border-radius: 4px;
  }
}
</style>
