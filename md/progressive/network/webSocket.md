## 概述

WebSocket是一种协议，用于在Web应用程序和服务器之间建立实时、双向的通信连接。它通过一个单一的TCP连接提供了持久化连接，这使得Web应用程序可以更加实时地传递数据。

## 优点

* **双工通信、实时性**： WebSocket是一个持久化的连接，来实现的数据传输，WebSocket协议支持双向通信，客户端可以主动向服务器推送信息，服务器也可以主动向客户端推送信息

## 缺点

* **资源**：由于WebSocket是一个长连接，所以一直会占用服务器资源，直到断开连接

## 创建一个webSocket服务前端

**前端**

```javascript
const ws = new WebSocket('ws://localhost:3000')


// 接受
ws.addEventListener('message', (e) => {
    console.log(e.data)
})

// 连接时触发
ws.addEventListener("open", () => {
    console.log("开启连接")
})

// 发送
ws.send("hi")

// 关闭连接
ws.close();
```

**后端-node**

```javascript
import express from 'express';
import { WebSocketServer } from 'ws'

const app = express()
const server = app.listen(3000, () => {
  console.log('服务启动')
})

// 后端创建websocket需要依附在服务上面
const wss = new WebSocketServer({server})

// 连接上会执行
wss.addEventListener('connection', ws => {
  // 发送
  ws.send("hello")
})

// 接受
wss.addEventListener('message', msg => {
   console.log(msg.data)
})
```

