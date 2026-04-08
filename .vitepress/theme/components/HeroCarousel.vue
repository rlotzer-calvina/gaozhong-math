<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'

const items = [
  {
    image: withBase('/images/descartes.png'),
    name: 'René Descartes',
    quote: 'Cogito, ergo sum',
    contribution: '解析几何之父'
  },
  {
    image: withBase('/images/euler.png'),
    name: 'Leonhard Euler',
    quote: 'E^iπ + 1 = 0',
    contribution: '拓展数学边界'
  },
  {
    image: withBase('/images/newton-leibniz.png'),
    name: 'Newton & Leibniz',
    quote: '站在巨人的肩膀上',
    contribution: '微积分创立者'
  },
  {
    image: withBase('/images/gauss.png'),
    name: 'Carl Friedrich Gauss',
    quote: '数学是科学的女王',
    contribution: '数学王子'
  }
]

const currentIndex = ref(0)
let timer = null

const startCarousel = () => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % items.length
  }, 4000)
}

onMounted(() => {
  startCarousel()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="hero-carousel">
    <transition-group name="fade" tag="div" class="carousel-container">
      <div 
        v-for="(item, index) in items" 
        :key="item.name"
        v-show="currentIndex === index"
        class="carousel-slide"
      >
        <img :src="item.image" :alt="item.name" class="carousel-img" />
        <div class="glass-tag">
          <div class="name">{{ item.name }}</div>
          <div class="desc">{{ item.contribution }} <span class="quote">"{{ item.quote }}"</span></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.hero-carousel {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.carousel-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.glass-tag {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: rgba(30, 30, 35, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px 20px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.name {
  font-size: 1.25rem;
  font-weight: 700;
  font-family: 'Outfit', var(--vp-font-family-base);
  margin-bottom: 4px;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.desc {
  font-size: 0.9rem;
  opacity: 0.9;
}

.quote {
  font-style: italic;
  opacity: 0.7;
  margin-left: 6px;
}

/* Vue Transition fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
