import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "博客",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '基础知识', link: '/md/basics' },
      { text: '进阶知识', link: '/md/progressive' },
      { text: '八股文', link: '/md/classical' },
    ],

    sidebar: {
      '/md/basics/': [
        {
          text: 'TypeScript',
          items: [
            { text: 'One', link: '/md/basics/typeScript/one' }
          ],
        },
        {
          text: 'Node',
          items: [
            { text: 'One', link: '/md/basics/node/one' }
          ],
        }
      ],
      '/md/progressive/': [
        {
          text: '埋点',
          items: [
            { text: '概念', link: '/md/progressive/tracker/concept' },
            { text: '简单实现', link: '/md/progressive/tracker/step' },
            { text: '总结', link: '/md/progressive/tracker/finalReport' },
          ]
        },
        {
          text: 'postcss',
          items: [
            { text: '概念', link: '/md/progressive/tracker/concept' },
            { text: '简单实现', link: '/md/progressive/tracker/step' },
            { text: '总结', link: '/md/progressive/tracker/finalReport' },
          ]
        },
        {
          text: '网络',
          items: [
            { text: 'xhr', link: '/md/progressive/network/xhr' },
            { text: 'fetch', link: '/md/progressive/network/fetch' },
            { text: 'sse', link: '/md/progressive/network/sse' },
            { text: 'websocket', link: '/md/progressive/network/webSocket' },
          ]
        },
      ],
      '/md/classical/': [
        {
          text: '八股文',
          items: [
            { text: 'One', link: '/guide/one' },
            { text: 'Two', link: '/guide/two' }
          ]
        }
      ],
    },

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
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    search: {
      provider: 'local',
    },
  },
  lastUpdated:true,
  outDir: "docs",
  base: "/blog"
})
