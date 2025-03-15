<template>
  <h2 :class="['section-title', alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left']">
    <span class="section-title__prefix" v-if="prefix">{{ prefix }}</span>
    <slot></slot>
  </h2>
</template>

<script setup>
defineProps({
  prefix: {
    type: String,
    default: "",
  },
  alignment: {
    type: String,
    default: "left",
    validator: (value) => ["left", "center", "right"].includes(value),
  },
});
</script>

<style lang="scss" scoped>
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  position: relative;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }

  &__prefix {
    display: block;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    color: var(--color-primary);
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  // Gradient effect
  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 4px;
    margin-top: 0.75rem;
    background: var(--gradient-primary);
    border-radius: 2px;
  }

  &.text-center::after {
    margin-left: auto;
    margin-right: auto;
  }

  &.text-right::after {
    margin-left: auto;
  }
}
</style>
