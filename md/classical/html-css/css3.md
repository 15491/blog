## CSS3新特性

比较好回答的是：其实并没有真正意义上的CSS3，通过W3C文档

* css3并不是一个单一的规范，而是一系列独立模块的集合，这些模块拓展css的功能
* 这种模块化的方法允许不同的特性以不同的速度发展，可以更快的标准化一些特性，而不必等待整个规范的完成

**这里举一些例子**

**选择器**

* 新的选择器 如 `[atrr^=value]`(属性已特定的字符串开始)
* 结构性伪类，如`:nth-child`、`:nth-last-child`、`:first-of-type`

**边框和边框**

* 边框图片`border-image`，允许使用图片来创建边框
* 多重背景 支持在单个元素上使用多个背景图片

**文本效果**

* 文本阴影 text-shadow 
* 文本溢出 text-overflow

**旋转和动画**

* 2D 和 3D转换 `transform` 包括旋转 rotate 缩放 scale 倾斜 skew 平移 translate
* css动画 animation 允许定义关键帧动画 控制动画序列