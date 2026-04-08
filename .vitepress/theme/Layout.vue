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
  </Layout>
</template>
