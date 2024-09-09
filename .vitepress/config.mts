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

    outline: {
      label: '文章目录',
    },

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
            { text: 'fs模块', link: '/md/basics/node/fs模块' },
            { text: 'events模块', link: '/md/basics/node/events模块' },
            { text: '数据的二进制', link: '/md/basics/node/数据的二进制' },
            { text: '流', link: '/md/basics/node/服务器开发、文件上传' },
            { text: 'http模块', link: '/md/basics/node/http模块' },
            { text: 'express', link: '/md/basics/node/express' },
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
          text: 'HTML-CSS',
          items: [
            { text: 'SEO', link: '/md/classical/html-css/seo' },
            { text: 'defer&async', link: '/md/classical/html-css/script' },
            { text: 'css3', link: '/md/classical/html-css/css3' },
            { text: 'DPR-PPI-DPI', link: '/md/classical/html-css/DPR-PPI-DPI' },
            { text: 'mobile', link: '/md/classical/html-css/mobile' },
          ]
        },
        {
          text: '浏览器渲染',
          items: [
            { text: 'DNS解析', link: '/md/classical/browser/DNS-TCP' },
            { text: '浏览器内核', link: '/md/classical/browser/browser-core' },
            { text: '浏览器渲染', link: '/md/classical/browser/browser-render' },
            { text: '重绘回流', link: '/md/classical/browser/backflow-redraw' },
            { text: '一些问题', link: '/md/classical/browser/issue' },
          ]
        },
        {
          text: 'CORS 跨域',
          items: [
            { text: 'CORS', link: '/md/classical/cors/cors' },
            { text: 'Nginx跨域访问 跨域', link: '/md/classical/cors/Nginx跨域访问' },
            { text: 'server 解决', link: '/md/classical/cors/server' },
            { text: '开发模式解决', link: '/md/classical/cors/vite-webpack' },
            { text: '问题', link: '/md/classical/cors/issue' },
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
