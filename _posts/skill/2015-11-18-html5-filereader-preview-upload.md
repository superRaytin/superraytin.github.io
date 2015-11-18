---
layout: post
title : HTML5 FileReader 实现图片预览和上传
date: 2015-11-18 12:37
disqus: y
---

### 回顾一下以前的图片上传方式

在 HTML5 出现之前，通常是使用 Form + Input file 来上传图片，而且只有这种方式，虽然在之后衍生出了 Ajax 异步提交的黑科技，但本质上还是隐藏 Iframe + Form，这种方法通过监听 Iframe 的 readystate 状态
改变来处理上传进度和结果，这种方式相比纯 Form 提交的方式在体验上得到了很大的提升，因为不用刷新页面了，很多单页面应用都采用的这种方式。

### 使用 HTML5 FileReader 上传

HTML5 出现了，图片上传的花样就多了，用 FileReader 来实现上面说的目的，原理其实就是通过 FileReader API 读取本地的图片文件，然后将文件转换成 base64 编码的字符串，即 Data URL，
说到这里，假如你对 Canvas 有一定了解，可能很快就明白了实现过程。

是的，最终目的是得到 Data URL 编码串，最后将其提交到后台，后台再转换为二进制图片文件。

下面是实现过程：

HTML：

```html
<input type="file" id="filechooser" />
<img alt="Image Previewer" id="previewer">
```

JS：

```js
var filechooser = document.getElementById('filechooser');
var previewer = document.getElementById('previewer');

filechooser.onchange = function() {
    var files = this.files;
    var file = files[0];

    // 接受 jpeg, jpg, png 类型的图片
    if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

    var reader = new FileReader();

    reader.onload = function() {
        var result = this.result;

        previewer.src = result;

        // 清空图片上传框的值
        filechooser.value = '';
    };

    reader.readAsDataURL(file);
};
```

上面代码中，主要用到了 FileReader 的 [readAsDataURL](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL) 实例方法，用来将 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 对象转换成 Data URL，这样就完成了图片预览功能。

另外，FileReader 还有一个 [readAsText](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText) 方法，可以读取文本文件中的内容，还可以指定编码方式，用处也很大。

### 结合 canvas 使用

为什么要结合 canvas 使用呢，canvas 有一个 toDataURL 方法，可以设置图片质量，利用这一特性，就可以用来压缩图片。

还是基于上面的代码，为图片上传增加一个压缩功能，比如超过 200KB，就按 75% 来压缩图片。

```js
var filechooser = document.getElementById('filechooser');
var previewer = document.getElementById('previewer');

// 200 KB 对应的字节数
var maxsize = 200 * 1024;

filechooser.onchange = function() {
    var files = this.files;
    var file = files[0];

    // 接受 jpeg, jpg, png 类型的图片
    if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

    var reader = new FileReader();
    reader.onload = function() {
        var result = this.result;
        var img = new Image();

        // 如果图片小于 200kb，则直接上传，否则压缩
        if (result.length <= maxsize) {
            toPreviewer(result);
            return;
        }

        img.onload = function() {
            var compressedDataUrl = compress(img, file.type);
            toPreviewer(compressedDataUrl);
            img = null;
        };

        img.src = result;
    };

    reader.readAsDataURL(file);
};

function toPreviewer(dataUrl) {
    previewer.src = dataUrl;
    filechooser.value = '';
}

function compress(img, fileType) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');

    var width = img.width;
    var height = img.height;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, width, height);

    // 压缩
    var base64data = canvas.toDataURL(fileType, 0.75);
    canvas = ctx = null;

    return base64data;
}
```

[查看 Demo](http://superraytin.github.io/demo/html5-file-reader-preview.html)

### 移动端使用的问题

项目使用中发现在 PC 上一切正常，但在 IOS 8.2 和 IOS 7.1.2 系统上有个问题，选择手机拍摄的图片在经过 canvas 压缩后，Data URL 变成了一长串空白像素的字符串，表现上就是预览区域是一片白，
而手机截屏的图片却能正常压缩，区别在于前者是 JPG 图片，后者是 PNG 格式的，目前尚不知原因所在，在 stackoverflow 上有这么一条记录 [FileReader not working on iOS 8](http://stackoverflow.com/questions/25999083/filereader-not-working-on-ios-8)，但和我遇到
的不是同一个问题。由于代码主要运行在手机浏览器，最后只能先把压缩功能撤销处理，改为原样上传。

从 [caniuse](http://caniuse.com/#search=filereader) 上可以看到，filereader 支持移动端 safari 6.1+ 和安卓原生浏览器 3.0+，canvas 支持 IOS safari 3.2+ 以及安卓原生浏览器 3.0+。
从兼容性支持上来看，还是非常不错的。

---

## 参考资料

- [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)