import { defineConfig } from 'vitepress'
import markdownItMathjax3 from 'markdown-it-mathjax3'

export default defineConfig({
  base: '/',
  title: '高中数学',
  description: '沪教版高中数学知识点与典型例题',
  srcDir: '.',
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap' }]
  ],
  markdown: {
    config: (md) => {
      md.use(markdownItMathjax3)
    }
  },
  themeConfig: {
    siteTitle: '高中数学',
    nav: [
      { text: '首页', link: '/' },
      { text: '高一数学', link: '/chapters/sets' },
    ],
    sidebar: {
      '/chapters/': [
        {
          text: '第一章：集合与常用逻辑用语',
          items: [
            { text: '完全指南 (集合与逻辑)', link: '/chapters/sets' },
            { text: '1.1 集合的概念与表示', link: '/chapters/coming-soon' },
            { text: '1.2 集合之间的关系', link: '/chapters/coming-soon' },
            { text: '1.3 集合的运算', link: '/chapters/coming-soon' },
            { text: '1.4 充分条件与必要条件', link: '/chapters/coming-soon' },
            { text: '1.5 全称量词与存在量词', link: '/chapters/coming-soon' },
            { text: '1.6 反证法', link: '/chapters/coming-soon' }
          ]
        }
      ]
    },
    search: {
      provider: 'local'
    },
    footer: {
      message: '© 2026 John’s Math Hub',
      copyright: 'Built with ❤️ @ SES (Shanghai Experimental School)'
    }
  }
})
