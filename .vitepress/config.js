import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '高中数学',
  description: '沪教版高中数学知识点与典型例题',
  srcDir: '.',
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
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
