<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { withBase, useData } from 'vitepress'

const { frontmatter, isDark } = useData()
const defaultTagline = frontmatter.value.hero?.tagline

const items = [
  {
    image: withBase('/images/descartes.png'),
    name: 'René Descartes',
    quote: 'Cogito, ergo sum',
    contribution: '解析几何之父',
    dynamicText: '从代数到几何的跨越 —— 掌握直角坐标系，重塑解析几何思维。'
  },
  {
    image: withBase('/images/euler.png'),
    name: 'Leonhard Euler',
    quote: 'E^iπ + 1 = 0',
    contribution: '拓展数学边界',
    dynamicText: '数学语言的定义者 —— 探索 $e, i, \\sum$ 的奥秘，领略最美数学公式。'
  },
  {
    image: withBase('/images/newton-leibniz.png'),
    name: 'Newton & Leibniz',
    quote: '站在巨人的肩膀上',
    contribution: '微积分创立者',
    dynamicText: '触摸变化的极限 —— 深入理解导数与积分，开启高等数学之门。'
  },
  {
    image: withBase('/images/gauss.png'),
    name: 'Carl Friedrich Gauss',
    quote: '数学是科学的女王',
    contribution: '数学王子',
    dynamicText: '数学王子的严谨逻辑 —— 从等差数列到概率统计，构建严密的知识体系。'
  }
]

const themeMap = {
  'René Descartes': '#4F46E5', // Deep Indigo
  'Leonhard Euler': '#10B981', // Emerald Green
  'Newton & Leibniz': '#F59E0B', // Amber Gold
  'Carl Friedrich Gauss': '#8B5CF6' // Royal Violet
}

const currentIndex = ref(0)
let timer = null

const lightenColor = (hex, percent) => {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.min(255, Math.floor(r + (255 - r) * percent));
  g = Math.min(255, Math.floor(g + (255 - g) * percent));
  b = Math.min(255, Math.floor(b + (255 - b) * percent));

  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}

const updateTagline = (initial = false) => {
  if (frontmatter.value && frontmatter.value.hero) {
    const currentName = items[currentIndex.value].name;
    let newColor = themeMap[currentName];

    // Boost brightness if dark mode is active to ensure visual tension
    if (isDark.value) {
      newColor = lightenColor(newColor, 0.25);
    }

    if (typeof document !== 'undefined') {
      // Update global theme colors
      document.documentElement.style.setProperty('--vp-c-brand', newColor);
      document.documentElement.style.setProperty('--vp-c-brand-1', newColor);
      document.documentElement.style.setProperty('--vp-c-brand-2', newColor);
      document.documentElement.style.setProperty('--vp-c-brand-3', newColor);

      const taglineEl = document.querySelector('.tagline') || document.querySelector('.VPHero .text');
      if (!initial && taglineEl) {
        taglineEl.style.transition = 'opacity 0.4s ease-in-out';
        taglineEl.style.opacity = '0';
        setTimeout(() => {
          if (frontmatter.value.hero) {
            frontmatter.value.hero.tagline = items[currentIndex.value].dynamicText;
          }
          taglineEl.style.opacity = '1';
        }, 400);
        return;
      }
    }
    frontmatter.value.hero.tagline = items[currentIndex.value].dynamicText;
  }
}

watch(isDark, () => {
  updateTagline(true); // Update immediately without animation when toggling theme
})

const startCarousel = () => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % items.length
    updateTagline(false)
  }, 4000)
}

onMounted(() => {
  updateTagline(true)
  startCarousel()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (frontmatter.value && frontmatter.value.hero && defaultTagline) {
    frontmatter.value.hero.tagline = defaultTagline
  }
  if (typeof document !== 'undefined') {
    document.documentElement.style.removeProperty('--vp-c-brand');
    document.documentElement.style.removeProperty('--vp-c-brand-1');
    document.documentElement.style.removeProperty('--vp-c-brand-2');
    document.documentElement.style.removeProperty('--vp-c-brand-3');
  }
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
  max-width: 450px;
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

<style>
/* Override VPHero Text Title */
.VPHero .text {
  font-size: clamp(2rem, 4vw, 2.2rem) !important;
  white-space: nowrap !important;
}
</style>
