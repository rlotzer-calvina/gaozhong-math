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
    tagline: '坐标之父，把直觉变成语言',
    desc: '1637年，笛卡尔躺在床上凝视飞蝇，忽然想到用数字描述它的位置——解析几何由此诞生。代数与几何，两个孤立的世界，在他的笔下第一次握手。'
  },
  {
    image: withBase('/images/euler.png'),
    name: 'Leonhard Euler',
    quote: 'E^iπ + 1 = 0',
    contribution: '拓展数学边界',
    tagline: '失明之后，他写得更多了',
    desc: '欧拉双目失明后，产量反而翻倍。他说：干扰少了。一生写下886部著作，几乎触及数学的每一个角落，e, i, π, 1, 0 在他手中第一次相遇。'
  },
  {
    image: withBase('/images/newton-leibniz.png'),
    name: 'Newton & Leibniz',
    quote: '站在巨人的肩膀上',
    contribution: '微积分创立者',
    tagline: '两人同时触碰了同一个真理',
    desc: '牛顿与莱布尼茨相隔英吉利海峡，互不知情，却在同一个十年里各自发明了微积分。这不是巧合，而是时代在召唤。真理不属于任何人，它只是在等待被发现。'
  },
  {
    image: withBase('/images/gauss.png'),
    name: 'Carl Friedrich Gauss',
    quote: '数学是科学的女王',
    contribution: '数学王子',
    tagline: '九岁时，他就看见了数字的秩序',
    desc: '老师让全班从1加到100，以为能让高斯安静一会儿。他几乎立刻写下了5050。他不是算得快，而是看见了数字背后的深层结构。数学的本质，不是计算，而是洞见。'
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
    const currentItem = items[currentIndex.value];
    let newColor = themeMap[currentName];

    if (isDark.value) {
      newColor = lightenColor(newColor, 0.25);
    }

    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--vp-c-brand', newColor);
      document.documentElement.style.setProperty('--vp-c-brand-1', newColor);
      document.documentElement.style.setProperty('--vp-c-brand-2', newColor);
      document.documentElement.style.setProperty('--vp-c-brand-3', newColor);

      const titleEl = document.querySelector('.VPHero .text');
      const descEl = document.querySelector('.VPHero .tagline');

      if (!initial && (titleEl || descEl)) {
        if (titleEl) titleEl.style.opacity = '0';
        if (descEl) descEl.style.opacity = '0';
        
        setTimeout(() => {
          if (frontmatter.value.hero) {
            frontmatter.value.hero.text = currentItem.tagline;
            frontmatter.value.hero.tagline = currentItem.desc;
          }
          if (titleEl) titleEl.style.opacity = '1';
          if (descEl) descEl.style.opacity = '1';
        }, 400);
        return;
      }
    }
    frontmatter.value.hero.text = currentItem.tagline;
    frontmatter.value.hero.tagline = currentItem.desc;
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
/* Global Hero Overrides for Stability & Transition */
.VPHero .text,
.VPHero .tagline {
  transition: opacity 0.4s ease-in-out !important;
}

.VPHero .text {
  font-size: clamp(1.8rem, 4vw, 2.2rem) !important;
  min-height: 1.5em; /* Prevent vertical jitter */
  white-space: normal !important; /* Allow wrapping if needed, but we clamp height */
}

.VPHero .tagline {
  min-height: 3.6em; /* Typical 3 lines height */
  margin-bottom: 24px !important;
  max-width: 500px;
}

@media (max-width: 960px) {
  .VPHero .text {
    min-height: auto;
    white-space: normal !important;
  }
  .VPHero .tagline {
    min-height: auto;
    max-width: 100%;
  }
}
</style>
