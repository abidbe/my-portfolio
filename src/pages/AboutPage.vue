<template>
  <div class="about-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header animate">
        <h1 class="page-title">About Me</h1>
        <p class="page-subtitle">Get to know more about my background, skills, and experience</p>
      </div>

      <!-- About Section -->
      <section class="about-section">
        <div class="about-content">
          <div class="about-text animate animate-from-left">
            <h2 class="about-heading">Who I Am</h2>
            <div class="about-description">
              <p v-for="(paragraph, index) in aboutParagraphs" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>

          <div class="about-image animate animate-from-right">
            <div class="image-container">
              <div class="image-placeholder">
                <img src="/images/me.svg" alt="Ilustrasi orang sedang ngoding" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="skills-section">
        <h2 class="section-title">My Skills</h2>

        <div class="skills-container">
          <div v-for="(category, index) in about.skills" :key="index" class="skill-category animate" :class="`animate-delay-${index * 2}`">
            <h3 class="category-title">{{ category.category }}</h3>
            <div class="skills-grid">
              <div v-for="(skill, skillIndex) in category.items" :key="skillIndex" class="skill-item">
                <div class="skill-name">{{ skill.name }}</div>
                <div class="skill-bar">
                  <div class="skill-progress" :style="{ width: `${skill.rating * 10}%` }"></div>
                </div>
                <div class="skill-rating">{{ skill.rating }}/10</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="experience-section">
        <h2 class="section-title">Experience</h2>

        <div class="timeline">
          <div v-for="(exp, index) in about.experience" :key="index" class="timeline-item animate">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-date">{{ exp.period }}</div>
              <h3 class="timeline-title">{{ exp.position }}</h3>
              <div class="timeline-company">{{ exp.company }}</div>
              <p class="timeline-description">{{ exp.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section class="education-section">
        <h2 class="section-title">Education</h2>

        <div class="education-grid">
          <div v-for="(edu, index) in about.education" :key="index" class="education-item animate">
            <div class="education-period">{{ edu.period }}</div>
            <h3 class="education-degree">{{ edu.degree }}</h3>
            <div class="education-institution">{{ edu.institution }}</div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section animate">
        <div class="cta-content">
          <h2 class="cta-title">Ready to start a project?</h2>
          <router-link to="/contact" class="btn btn--primary">Get in Touch</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useDataStore } from "../stores/dataStore";
import { useScrollAnimation } from "../composables/useScrollAnimation";

const dataStore = useDataStore();
const { about } = dataStore;
const { initAnimations } = useScrollAnimation();

// Parse about description into paragraphs
const aboutParagraphs = computed(() => {
  return about.description
    .trim()
    .split("\n\n")
    .map((p) => p.trim());
});

// Fungsi getRandomProgress tidak lagi diperlukan karena kita menggunakan nilai kustom

onMounted(() => {
  initAnimations();
});
</script>

<style lang="scss" scoped>
.about-page {
  padding: 8rem 0 4rem;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;

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

.about-section {
  margin-bottom: 6rem;

  .about-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;

    @media (min-width: 768px) {
      grid-template-columns: 3fr 2fr;
    }
  }

  .about-heading {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background: var(--gradient-primary);
    }
  }

  .about-description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--color-text-dim);

    p {
      margin-bottom: 1.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .about-image {
    .image-container {
      position: relative;
      width: 100%;
      padding-bottom: 120%;
    }

    .image-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .image-placeholder img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 3px;
    background: var(--gradient-primary);
  }
}

.skills-section {
  margin-bottom: 6rem;

  .skills-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .skill-category {
    .category-title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      color: var(--color-primary);
    }
  }

  .skills-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .skill-item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .skill-name {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      flex: 1;
    }

    .skill-rating {
      font-size: 0.85rem;
      color: var(--color-primary);
      width: 40px;
      text-align: left;
      margin-top: 0.25rem;
    }

    .skill-bar {
      height: 6px;
      background-color: var(--color-bg-alt);
      border-radius: 3px;
      overflow: hidden;
      flex-basis: 100%;
    }

    .skill-progress {
      height: 100%;
      background: var(--gradient-primary);
      border-radius: 3px;
      transition: width 1.5s cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
}

.experience-section {
  margin-bottom: 6rem;

  .timeline {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 20px;
      height: 100%;
      width: 2px;
      background-color: var(--color-border);

      @media (min-width: 768px) {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .timeline-item {
    position: relative;
    padding-left: 60px;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      padding-left: 0;
      width: 50%;

      &:nth-child(even) {
        margin-left: 50%;
        padding-left: 60px;

        .timeline-dot {
          left: -10px;
        }

        .timeline-date {
          left: -280px;
          text-align: right;
        }
      }

      &:nth-child(odd) {
        padding-right: 60px;

        .timeline-dot {
          right: -10px;
        }

        .timeline-date {
          right: -280px;
          text-align: left;
        }
      }
    }
  }

  .timeline-dot {
    position: absolute;
    top: 15px;
    left: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--color-primary);
    z-index: 1;

    @media (min-width: 768px) {
      left: auto;
      right: -10px;
    }
  }

  .timeline-content {
    background-color: var(--color-bg-alt);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .timeline-date {
    font-size: 0.9rem;
    color: var(--color-primary);
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
      position: absolute;
      top: 15px;
      width: 250px;
      color: var(--color-text-dim);
    }
  }

  .timeline-title {
    font-size: 1.25rem;
    margin-bottom: 0.25rem;
  }

  .timeline-company {
    font-size: 1rem;
    color: var(--color-text-dim);
    margin-bottom: 1rem;
  }

  .timeline-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--color-text-dim);
  }
}

.education-section {
  margin-bottom: 6rem;

  .education-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .education-item {
    background-color: var(--color-bg-alt);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-10px);
    }
  }

  .education-period {
    font-size: 0.9rem;
    color: var(--color-primary);
    margin-bottom: 0.75rem;
  }

  .education-degree {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .education-institution {
    font-size: 1rem;
    color: var(--color-text-dim);
  }
}

.cta-section {
  text-align: center;
  background-color: var(--color-bg-alt);
  padding: 4rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;

  .cta-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .btn {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
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
