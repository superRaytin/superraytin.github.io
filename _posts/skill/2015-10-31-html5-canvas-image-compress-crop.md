---
layout: post
title : HTML5 Canvas 实现图片压缩和裁切
date: 2015-10-31 16:27
disqus: y
---

### 前面的话

早些时候用 [Node-webkit](http://nwjs.io/)（现在叫 nw.js） 编写过一个辅助前端切图的工具，其中图片处理部分用到了 [gm](http://aheckmann.github.com/gm/)，gm 虽然功能强大，但用于 Node-webkit 却有点发挥不了用处，gm 强依赖于用户的本地环境安装 [imagemagick](http://www.imagemagick.org/) 和 [graphicsmagick](http://www.graphicsmagick.org/)，而安装 imagemagick 和 graphicsmagick 非常不方便，有时候还需要翻墙，所以这个工具大多数时候是我自己在玩。

为了降低安装成本，这两天开始研究去掉图片处理功能中的 gm 依赖，替换为 HTML5 Canvas 来实现。

---

在这之前没有深入研究过 canvas，通过这两天的查资料过程，发现 canvas 的 API 非常丰富，实现本文的功能可以说只用到了 canvas 的冰山一角。

功能实现主要用到了 `CanvasRenderingContext2D.drawImage` 和 `HTMLCanvasElement.toDataURL` 两个方法，接下来先介绍一下这两个方法，如果想直接看结果，可以跳到文章结尾查看完整的例子和代码。

#### CanvasRenderingContext2D.drawImage()

drawImage 方法是 Canvas 2D 对象的方法，作用是将一张图片绘制到 canvas 画布中。

创建一个 Canvas 2D 对象：

```
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
```

drawImage 有 3 种调用方式：

```
ctx.drawImage(image, dx, dy);
ctx.drawImage(image, dx, dy, dWidth, dHeight);
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

各个参数的意义：

- **image** 图片元素，除了图片，还支持其他 3 种格式，分别是 `HTMLVideoElement` `HTMLCanvasElement` `ImageBitmap`，本文只涉及图片，如果想了解其余格式可以参考 [这里](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
- **sx** 要绘制到 canvas 画布的源图片区域（矩形）在 X 轴上的偏移量（相对源图片左上角）
- **sy** 与 sx 同理，只是换成 Y 轴
- **sWidth** 要绘制到 canvas 画布中的源图片区域的宽度，如果没有指定这个值，宽度则是 sx 到图片最右边的距离
- **sHeight** 要绘制到画布中的源图片区域的高度，如果没有指定这个值，高度则是 sy 到图片最下边的距离
- **dx** 源图片左上角在 canvas 画布 X 轴上的偏移量
- **dy** 源图片左上角在画布 Y 轴上的偏移量
- **dWidth** 绘制图片的 canvas 画布宽度
- **dHeight** 绘制图片的画布高度

是不是有点晕了？下面这张图可以直观地说明它们的关系：

![](https://mdn.mozillademos.org/files/225/Canvas_drawimage.jpg)

还是不好理解？那换个姿势，可以这么理解：首先用 sx 和 sy 这两个值去定位图片上的坐标，再根据这个坐标点去图片中挖出一个矩形，矩形的宽高就是 sWidth 和 sHeight 了。矩形挖出来了，现在要把它绘制到画布中去，这时用 dx 和 dy 两个值来确定矩形在画布中的坐标位置，再用 dWidth 和 dHeight 确定划出多少画布区域给这个矩形。

#### HTMLCanvasElement.toDataURL()

toDataURL 是 canvas 画布元素的方法，返回指定图片格式的 data URI，也就是 base64 编码串。

toDataURL 方法最多接受两个参数，并且这两个参数都是可选的：

- **type** 图片格式。支持 3 种格式，分别是 `image/jpeg` `image/png` `image/webp`，默认是 `image/png`。其中 `image/webp` 只有 chrome 才支持。
- **quality** 图片质量。0 到 1 之间的数字，并且只在格式为 `image/jpeg` 或 `image/webp` 时才有效，如果参数值格式不合法，将会被忽略并使用默认值。

另外，如果对应的 canvas 画布宽度或高度为 0，将会得到字符串 `data:,`，若图片格式不是 image/png，却得到一个以 `data:image/png` 开头的值，则说明不支持此图片格式。

#### 图片质量

对于图片质量参数的默认值，官方文档并没有说明，[这里](http://stackoverflow.com/questions/8371510/canvas-reduces-imagesize-of-jpeg-but-why) 提到 Firefox 的默认值是 0.92，我在最新 chrome 浏览器中测试发现大概也是这个数字。不过要想达到各平台统一表现，最好的办法是手动设置此参数。

---

### 实现图片压缩的关键代码

HTML：

```html
<canvas id="canvas"></canvas>
<img id="preview" src="">
<img id="source" src="" style="display: none;">
```

JS：

```js
var canvas = document.getElementById('canvas');
var source = document.getElementById('source');
var preview = document.getElementById('preview');

source.onload = function() {
	var width = source.width;
	var height = source.height;
	var context = canvas.getContext('2d');

	// draw image params
	var sx = 0;
	var sy = 0;
	var sWidth = width;
	var sHeight = height;
	var dx = 0;
	var dy = 0;
	var dWidth = width;
	var dHeight = height;
	var quality = 0.92;

	canvas.width = width;
	canvas.height = height;

	context.drawImage(source, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

	var dataUrl = canvas.toDataURL('image/jpeg', quality);
	preview.src = dataUrl;
};

source.src = 'house.jpg';
```

编写了一个简单的 [Demo](superraytin.github.io/demo/canvas-compressor.html)，可输入质量参数查看压缩结果。

### 图片压缩结果分析

用作测试的是一张大小为 146 KB 的 JPG 图片。

![canvas-image-compress-crop](/images/boa-hancock.jpg)

测试过程分别使用了 50%, 80%, 92%, 95%, 96%, 97%, 98%, 99%, 100% 这八个质量参数，结果如下：

![canvas-image-compress-crop](/images/canvas-image-compress-crop-1.png)

换算成图表：

![canvas-image-compress-crop](/images/canvas-image-compress-crop-2.png)

从图表中可以看到，压缩比为 95% 时与原图大小最接近，此后，随着压缩参数增大直到 98%，增长比较规律，但从 98 到 99 尤其是 99 到 100，增长突然变陡，比原图大小翻了将近 3 倍！

这里存在两个问题：

- 为什么 95% 是最接近原图的压缩比？这是否普遍规律？
- 为什么 100% 比原图增大了这么多？

在网上查了一些资料，但并没有找到确切的原因，也没有找到与之相匹配的类似问题。或许是我搜索的方式不对？如果你正好知道，欢迎留言告知。

### 实现图片裁切的不完全代码

```js
function cropImage(targetCanvas, x, y, width, height) {
    var targetctx = targetCanvas.getContext('2d');
    var targetctxImageData = targetctx.getImageData(x, y, width, height); // sx, sy, sWidth, sHeight

    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');

    c.width = width;
    c.height = height;

    ctx.rect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.putImageData(targetctxImageData, 0, 0); // imageData, dx, dy

    document.getElementById('source2').src = c.toDataURL('image/jpeg', 0.92);
    document.getElementById('source2').style.display = 'initial';
}
```

以上代码，主要解释下 getImageData 和 putImageData 两个方法，它们都是 Canvas 2D 对象的方法，前者用于获取画布上根据参数指定矩形的像素数据，返回的是一个多维数组。后者则用于将这些像素数据绘制到画布中，同样可以指定画布中的绘制位置。

裁切的原理是通过 canvas A 的 getImageData 方法取出图片中指定区域的像素数据，再用 canvas B 的 putImageData 方法将像素数据绘制到 canvas B 中，并保持 canvas B 的尺寸与取出区域的尺寸一致。canvas B 中的图片就是裁切得到的图片区域块。

比如要裁切女帝的左耳环：

![canvas-image-compress-crop](/images/canvas-image-compress-crop-3.jpeg)

简单量一下距离，就可以用下面的代码实现：

```js
cropImage(canvas, 250, 250, 90, 80)
```

好了，差不多就是这些。

### 参考资料

- [drawImage API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)
- [toDataURL API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
- [getImageData API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData)
- [putImageData API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData)
- [HTML5 Canvas Image Crop Tutorial](http://www.html5canvastutorials.com/tutorials/html5-canvas-image-crop/)
