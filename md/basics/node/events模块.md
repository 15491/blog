# events模块

## eveents模块基本使用

```javascript
// 创建events实例
const emitter = new EventEmitter()

const handleFn = (listener) => {
    console.log("监听事件"， listener)
}

// 派发事件
emitter.emit("事件名称", "stan")

// 监听事件
emitter.on("事件名称", handleFn)

// 移除事件
emitter.off("事件名", handleFn)

```

## 其他方式

```javascript
const emitter = new EventEmitter()

const handleFn = (listener) => {
  console.log(listener)
}

// 监听事件
emitter.addListener('one', handleFn)
emitter.addListener('two', handleFn)

// 派发事件
emitter.emit('one', '嗨嗨嗨')
emitter.emit('two', '嘿嘿嘿')

// 移除事件
emitter.removeListener('one', handleFn)
emitter.removeListener('two', handleFn)
```

## 常见方法

```javascript
const emitter = new EventEmitter()

// 修改最大监听数量
emitter.setMaxListeners(20)

// 返回最大监听数量 可以通过set
const max = emitter.getMaxListeners()
console.log(max)

emitter.emit('one', 1)
emitter.emit('two', 2)
emitter.emit('three', 1)

emitter.on('one', () => {})
emitter.on('one', () => {})
emitter.on('two', () => {})
emitter.on('three', () => {})

// 拿到监听的事件的数组
const names = emitter.eventNames()
console.log(names)

// 拿到某个事件的监听器的个数
const a = emitter.listenerCount('one')
console.log(a)

// 拿到某个所有监听器数组
const b = emitter.listeners('one')

// 事件监听一次
emitter.once('one', (args) => {
  console.log(args)
})

// 提前
emitter.prependListener('one', (args) => {
  console.log('监听', args)
})

// 提前并只执行一次
emitter.prependOnceListener('one', (args) => {
  console.log(args)
})


// 不传参 移除所有  传参  name  移除对应的所有 监听
emitter.removeAllListeners()
```

