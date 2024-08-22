import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "博客",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '基础知识', link: '/md/basics/test' },
      { text: '进阶知识', link: '/md/progressive/test' },
      { text: '八股文', link: '/md/classical/test' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    lastUpdated: {
      text: '最后更新时间',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    },
  },
  lastUpdated:true,
  outDir: "docs",
  base: "/docs/"
})
