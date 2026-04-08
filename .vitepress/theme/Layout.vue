<script setup>
import DefaultTheme from 'vitepress/theme'
import HeroCarousel from './components/HeroCarousel.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <HeroCarousel />
    </template>
    
    <template #home-hero-actions-after>
      <div class="quick-tags">
        <a href="./chapters/sets" class="quick-tag">集合</a>
        <a href="./chapters/coming-soon" class="quick-tag">不等式</a>
        <a href="./chapters/coming-soon" class="quick-tag">函数</a>
        <a href="./chapters/coming-soon" class="quick-tag">三角比</a>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.quick-tags {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.quick-tag {
  padding: 4px 16px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.quick-tag:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
}
</style>
