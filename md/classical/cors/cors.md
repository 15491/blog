# 认识跨域访问

## 什么是跨域访问

**跨域问题通常是由浏览器的同源策略引起的访问问题**

* 同源策略是浏览器的一个重要的安全机制，它用于限制一个来源的文档或脚本如何能够与另一个来源的资源进行交互

**同源策略的定义：同源策略要求连个url必须满足三个条件**

* 协议：例如http、htpps
* 域名：www.123.com和api.123.com是不同的主机
* 端口：像8080端口和8081端口就是不同的端口

**只有当两个url的协议、主机和端口都相同时，才被认为是同源。否则，浏览器会认为他们是跨域的**

**跨域问题的产生和前后端分离的发展密切相关**

* 在早期，服务器渲染的应用通常不会有跨域问题，因为前端代码和后端api都在同一个服务器上运行
* 随着前后端分离的出现，前后端代码和后端api经常部署在不同的服务器上，这就引发了跨域问题
* 例如，一个网站的静态资源可能部署在www.123.com上，接口却在api.123.com上
* 浏览器在发现静态资源和api不在同一个源时，就会产生跨域问题

**所以，在静态资源服务器和API服务器(其他资源类同)是同一台服务器时，是没有跨域问题的**

## 如何解决跨域

**那么跨域问题如何解决**

* 所有的跨域解决方案都跟服务器有关系，单独的前端基本解决不了跨域(网上也有一些方案可以，但是基本都不会用)

**解决方案**

* 将静态资源和API服务器部署在同一个服务器中
* cors，即是指跨域资源共享
* 本地方案，webpack或vite提供一个node服务器代理
* Nginx反向代理

**不常见的方案**

* jsonp
* postMessage
* webSocket

## CORS 跨段资源共享

**跨源资源贡献（cors）**

* 他是一种基于http header的机制
* 该机制允许服务器标示除了他自己以外的其他源(域，协议，端口)，使得浏览器允许这些 origin 访问加载自己的资源

```javascript
app.use((ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    ctx.set("Access-Control-Allow-Headers", "Content-type, Authorization, Accept")
    await next()
})
```

**设置解释**

* Access-Control-Allow-Origin：允许所有的域名访问，也可以指定特定的域名
* Access-Control-Allow-Methods：允许的HTTP请求方式
* Access-Control-Allow-Headers：允许的HTTP请求头

**限定origin（源）访问**

```javascript
ctx.set("Access-Control-Allow-Origin", "http://127.0.0.1:3000")
```

**另外我们可以了解一下浏览器机制，关于预请求和实际请求**

**预检请求**

* 对于复杂请求(如果使用 PUT DELETE或自定义头)，浏览器会先发送OPTIONS请求，询问服务器是否允许跨域请求
* 服务器如果同意跨域请求，则返回包含CORS头信息的相应

**实际请求**

* 如果预检请求被允许，浏览器会发送实际请求，并且在请求头中会包含一些CORS的头信息
* 服务器在相应中包含CORS头信息，这些信息会被浏览器验证

## 预检请求的处理

**因为预见请求是一个options的请求，所以我们最好对他进行单独处理**

```javascript
app.use(async(ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    ctx.set("Access-Control-Allow-Headers", "Content-type, Authorization, Accept")
    
    // 如果是预检请求 则直接返回204
    if(ctx.method === "OPTIONS") {
        ctx.status = 204
        return
    }
    
    await next()
})
```

