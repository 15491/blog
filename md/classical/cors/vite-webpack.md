## Vite和Webpack底层方案(Node服务器)

**平时开发过程中，都是使用vite或是webpack提供的代理**

**webpack**

```js
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
```

**vite**

```javascript
export default defineConfig({
  server: {
    proxy: {
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      '/foo': 'http://localhost:4567',
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // 正则表达式写法：http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ''),
      },
      // 使用 proxy 实例
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      },
      // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      // 在使用 `rewriteWsOrigin` 时要特别谨慎，因为这可能会让代理服务器暴露在 CSRF 攻击之下
      '/socket.io': {
        target: 'ws://localhost:5174',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
})
```

**其实不管是webpack还是vite都是通过开启一个Node服务器代理进行解决跨域的**

## 底层原理

**创建开发服务器**

* 使用Node.js的http模块创建一个本地开发服务器，监听特定端口
* 这个开发服务器负责处理所有的前端请求，包括静态文件，热模块替换，API代理等

**使用http-proxy实现代理**

* vite或者webpack使用http-proxy或者http-proxy-middleware来创建代理中间件
* 代理中间件会拦截特定路径的请求，并将这些请求转发到目标服务器

```javascript
const express = require("express")

const { createProxyMiddleware } = require("http-proxy-middleware")

const app = express()

app.use(express.static("./static"))

app.use("/api", createProxyMiddleware({
    target: "http://localhost:8000",
    pathRewrite: {
        "^api": ""
    },
    changeOrigin: true
}))

app.listen(8001, () => {
    console.log("proxy服务器启动成功")
})
```

