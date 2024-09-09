# express框架

## express初体验

**express安装有两种方式**

* 通过express提供的脚手架，直接创建一个应用

  * ```shell
    // 安装脚手架
    npm i -g express-generator
    
    // 创建项目
    express express-demo
    
    // 安装依赖
    npm i
    
    // 启动项目
    node bin/ww
    ```

* 从零自己搭建

  * npm init -y

**基本使用**

```javascript
const express = require("express")

const app = express()

app.post('/login', (req, res) => {
    console.log(req)
    res.send("hello")
})

app.get("/homo", (req, res) => {
    console.log(req)
    res.end("home")
})



app.listen(3000 ,() => {
    console.log("启动")
})
```

**请求路径如果有一些参数，可以这样表达**

* /user/:userId
* 在request对象中获取通过 req.params.userId

## express中间件

**express是一个路由和中间价，它本身个功能非常少**

* express应用本质上一系列中间件函数的调用

**中间件是什么**

* 中间件的本质是传递给express的一个回调函数
* 这个回调函数接收三个参数
  * 请求对象 request对象
  * 相应对象 response对象
  * next函数 在express中定义用于执行下一个中间件的函数

**中间件可以执行那些任务**

* 执行任何代码
* 更改请求和相应对象
* 结束请求-相应周期（返回数据）
* 调用栈中的写一个中间件

**如果当前中间件功能没有结束请求-相应周期，则必须调用next()将控制权传递给下一个中间件功能，否则，请求将被挂起**

**如何将一个中间件应用到我们的应用程序**

* express提供了两种方式
  * app/router.use
  * app/router.methods
* 可以是app也可以是router
* methods指的是常用的请求方式，比如app.get

**use的用法，methods的本质就是use的特殊情况**

```javascript
// 普通的中间件
app.use((req, res, next) => {
    res.end("use触发")
    next()
})

// path匹配的中间件
app.use("/user", (req, res) => {
    res.end("path")
})

// path和methods匹配中间件
app.get("/user", (req, res) => {
    res.end("path&methods")
})

// 注册多个中间件
app.get("/home", (req,res, next) => {
    console.log(1)
    next()
}, (req, res, next) => {
    console.log(2)
    res.end("hello")
    next()
})
```

* 通过use  注册的中间件  无论是什么请求方式都可以匹配上
* 任意情况都会被相应
* 后续的中间件是否执行取决于上一个中间件是否使用next

**应用中间件-body解析**

**并非所有的中间件都由我们自己编写**

* express有内置一些帮助我们完成对request解析的中间件
* reqgistry仓库中也有很多可以辅助我们开发的中间件

**在客户端发送post请求时，会将数据返到body中**

* 客户端可以通过json的方式传递
* 也可以通过form表单方式传递

```javascript
app.use(express.json())
```

**如果我们需要解析的时applocation/x-www-form-urlencoded**

```javascript
app.use(express.urlencoded({ extended: true }))
```

**应用插件-第三方中间件**

* 如果我们需要日志记录，那么可以使用 morgan

  * ```javascript
    const log = fs.createWriteStream("写入路径", {
        flags: "a+"
    })
    
    app.use(morgan("combined", { stream: log }))
    ```

* 上传文件可以使用express提供的multer来完成

  * ```javascript
    const upload = multer({
        dest: "uploads/"
    })
    
    app.post("/upload", upload.single("file"), (req, res, next) => {
        console.log(req.file.buffer)
        res.end("文件上传成功")
    })
    ```

**添加后缀名**

* 上传文件，我们可以使用express提供的multer来完成

  * ```javascript
    const storage = multer.disStorage({
        destination: (req, file, cb) => {
            cb(null, "uoload/")
        },
        fileName: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
    
    const upload = multer({
        storage
    })
    
    app.post("/upload", upload.single("file"), (req, res, next) => {
        console.log(req.file.buffer)
        res.end("文件上传成功")
    })
    ```

**multer解析form-data**

* 如果我们希望multer帮助我们解析一些form-data中的普通数据，那么可以使用any

  * ```javascript
    app.use(upload.any())
    ```

## express请求和相应

**客户端发送请求**

* 方式一：通过get请求中的url的params
* 方式二：通过get请求中的url的query
* 方式三：通过post请求中的body的json
* 方式四：通过post请求中的body的x-www-form-ulrencoded
* 方式五：通过post请求中的form-data格式

**params和query参数**

```javascript
// 请求地址 http://localhost:8000/login/123
app.use("/login", (req, res) => {
    console.log(req.params)
    res.json("请求成功")
})

// 请求地址 http://localhost:8000/login?username=name
app.use("/login", (req, res) => {
    console.log(req.query)
    res.json("请求成功")
})
```



## express路由

## express错误处理

## express源码解析