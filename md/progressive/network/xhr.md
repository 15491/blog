## 创建xhr

```javascript
// 创建xhr实例
const xhr = new XMLHttpRequest()

// open方法初始化一个新创建的请求，或重新初始化一个请求
xhr.open("GET", "http://localhost:3000/get")

// 设置请求头信息 必须在open-send之间使用
xhr.setRequestHeader(header, value)


// readystatechange事件可以配合readyState的值来判断请求是否结束
xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4)) {
        console.log(xhr.responseText)
    }
})

// 相对来说load事件更为实用 他只会在readyState等于4的时候触发
xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      console.log("结束了");
    }
})

// 发送请求 请求体的参数放在这里
xhr.send()
```

## 超时

```javascript
// timeout属性可以设置超时时间
xhr.timeout = 3000

// timeout事件可以监听到请求超时 并作出处理
xhr.addEventListener("timeout", () => {
    console.log("请求超时")
})
```



## 进度条

```javascript
// progress可以获取到请求进度 帮助我们实现进度条功能
xhr.addEventListener("progress", e => {
    // e.total 可以获取全部 e.loaded 可以获取当前进度
    console.log(e)
})
```

## 取消

```javascript
// 请求如何取消？ xhr提供了abort方法
xhr.abort()

// 还有对应监听的事件
xhr.addEventListener("about", () => {
    console.log("请求被取消了")
})
```

## 捕获错误

```javascript
// error事件可以监听到请求错误
xhr.addEventListener("error", e => {
    console.log(e, "请求错误")
})
```

