import { defineConfig } from 'vitepress'
import markdownItKatex from 'markdown-it-katex'

export default defineConfig({
  base: '/gaozhong-math/',
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
      md.use(markdownItKatex)
    }
  },
  themeConfig: {
    siteTitle: '高中数学',
    nav: [
      { text: '首页', link: '/' },
      { text: '高一数学', link: '/notes/gaozhong/gaoyi/chapter01-sets/' },
    ],
    sidebar: {
      '/notes/gaozhong/': [
        {
          text: '高一数学',
          items: [
            {
              text: '第一章：集合',
              link: '/notes/gaozhong/gaoyi/chapter01-sets/',
            },
          ]
        }
      ]
    },
    search: {
      provider: 'local'
    }
  }
})
