## 移动端使用@2X @3X 的图片 （移动端适配）

**目前在移动端设备中，有很多高分辨率的设备。为了适应不同的像素密度，ui 需要提供多个版本的图像资源**

通常标记为@1x，@2x，@3x：

- @1x 图像：基本尺寸，适用于低分辨率设备
- @2x 图像：是基本图像尺寸的两倍，适用于中等分辨率设备，device-pixel-ratio 为 2 的设备
- @3x 图像：是基本图像尺寸的三倍，使用于高分辨设备，device-pixel-ratio 为 3 的设备

**如果都使用的@1x 的图片，在高分辨率下图像就会非常模糊，模糊的图像可能会使产品显得粗糙，影响用户对于品质的整体感觉**

**我们开发 web 可以通过媒体查询来设置不同的图像**

```css
.box {
  width: 132px;
  height: 171px;
  background-color: red;
  background-image: url(./img/bg.png);
  background-size: cover;
}

/* 针对2x屏幕 */
@media only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min--moz-device-pixel-ratio: 2),
  only screen and (-o-min-device-pixel-ratio: 2),
  only screen and (min-device-pixel-ratio: 2) {
  .box {
    background-image: url("./img/bg@2.png");
  }
}

/* 针对3x屏幕 */
@media only screen and (-webkit-min-device-pixel-ratio: 3),
  only screen and (min--moz-device-pixel-ratio: 3),
  only screen and (-o-min-device-pixel-ratio: 3),
  only screen and (min-device-pixel-ratio: 3) {
  .box {
    background-image: url("./img/bg@3.png");
  }
}
```

**-webkit-min-device-pixel-radio 问题**

在 mdn 上可以搜到遮是一个非标准的特性，是 resolution 的一个替代方案

## 特性 resolution

**resolution 媒体是 css 标准中用于查询设备显示密度的推荐方式**

它支持多种单位 dpi dpcm dppx

使用 dppx 即可 1dppx 相当于一个设备独立像素对应于一个屏幕物理像素

```css
/* 针对2x屏幕 */
@media only screen and (min-resolution: 2dppx) {
  .box {
    background-image: url("./img/bg@2x.png");
  }
}

/* 针对3x屏幕 */
@media only screen and (min-resolution: 3dppx) {
  .box {
    background-image: url("./img/bg@3x.png");
  }
}
```

## 1px 问题，如何去解决，如何画出 0.5px 边框

**我们知道在移动端的设计稿中，往往 UI 给的设计稿宽度为 750px，图中设计的边框宽度为 1px，在我们 375px 的设备下，我们应该将宽度写为 0.5px**

**但是如果直接设置 0.5 的话，一些设备（特别是旧的移动设备和浏览器）并且不支持 0.5px，这个就是我们常说的 1px 问题以及如何画出 0.5px 边框的 问题**

**常见的方案有两种**

- viewport + rem + div 淘宝
- 伪类 + transform 京东

```css
.border-test {
    position: relative;
    padding: 10px;
    margin: 20px;
    display: inline-block;
}

.border-test::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    border: 1px solid red;
    transform-origin: 0 0;
    transform: scale(0.5);
}
```

## BFC

**什么是 FC**

元素在标准流里面都是属于一个 FC 的

块级元素的布局就是 BFC

行内级就是 IFC

**MDN 上有整理什么情况下会创建 BFC**

根元素 html

浮动元素 元素的 float 不是 none

绝对定位元素 元素的 position 为 absolute 或 fixed

行内块元素 元素的 display 为 inline-block

表格单元格

overflow 计算值 不为 visible 的块元素

弹性元素 display 为 flex 或 inline-flex 元素的直接子元素

网格元素 display 为 grid 或者 inline-grid 元素的直接子元素

display 值为 flow-root 元素

**BFC 特点**

- 在 BFC 中，box 会在垂直方向上一个挨着一个的排布
- 垂直方向的间距有 margin 属性决定
- 在同一个 BFC 中，相邻两个 box 之间的 margin 会折叠
- 在 BFC 中，每个元素的左边边缘是紧挨着包含块的左边边缘的

**BFC 作用**

1. 解决 margin 上下重叠问题，两个 bfc 元素就不存在这中问题
2. 解决高度塌陷问题，父元素没有高，子元素浮动会导致高度塌陷

## **通常会采取那些措施确保网站在不同浏览器上的兼容性**

**可以通过这几个角度来回答： 其实在现代的工程化的开发架构下 大多数浏览器兼容性问题是可以通过工程化中的配置选项来解决的**

- 比如 browserslist 可以配置目标浏览器或者 node 环境，然后在不同工具中起作用，比如 autoprefixer/babel/postcss-preset-env 等，在进行了正确的配置后，开发的 vue 或 react 在项目打包的时候，会自动根据目标环境来添加 CSS 前缀，Babel 代码转换等
- 如果我们想要额外的适配，通常会引入 normal.css 和 polyfills 来添加特定的 css,js 的适配问题
- 还有一些事针对移动端的，比如移动端点击 300ms 的延迟、移动端 1px 边框的问题，都可以在特定的环境或者需求下来解决
- 当遇到问题时，很重要的事我们需要多查询 can i use 的网站来确定某些特性的兼容性
- 另外如果针对特定的用户使用的事不同的浏览器和设备时，我们需要使用特定的工具，比如 BrowserStack 这样的工具来进行测试，遇到特定问题 时，及时的解决和处理
