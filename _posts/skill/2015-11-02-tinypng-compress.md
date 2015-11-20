---
layout: post
title : 图片压缩利器 —— Tinypng 简介
date: 2015-11-02 00:37
disqus: y
---

![tinypng](/images/tinypng-banner.png)

[Tinypng](https://tinypng.com/) 是一款 PNG 图片压缩工具，压缩率能达到 50% 以上，图片在压缩之前和之后几乎看不出差别。

Tinypng 在设计师人群中比较流行，现在介绍给广大的程序员。

据官网介绍，它的原理是通过合并图片中相似的颜色，通过将 24 位的 PNG 图片压缩成小得多的 8 位色值的图片，并且去掉了图片中不必要的 metadata（元数据，从 Photoshop 等工具中导出的图片都会带有此类信息），这种方式几乎能完美支持原图片的透明度。

它还有一个兄弟叫 [Tinyjpg](https://tinyjpg.com/)，支持 JPG 图片压缩。

## 使用方式

登录 Tinypng 官网，拖拽文件即可使用，通过官网的在线压缩方式测试了几次，得到的图片压缩率都在 70% 以上，几乎无损。#牛X的算法#

![tinypng](/images/tinypng-compress-1.png)

除了在线使用，还可以通过其提供的 [PhotoShop 插件](https://tinypng.com/photoshop)来导出图片，不过程序员肯定是看不上的，另外 $50 美刀的价格也略贵，所以就不详细介绍了，Tinypng 提供了 HTTP API，使用之前需要先[申请 key](https://tinypng.com/developers)，免费版每月可以处理 500 张图片，对于一般项目来说够用了。

申请好 key 之后，就可以使用以下方式：

### 命令行一键压缩

```
curl --user api:$YOUR_API_KEY \
     --data-binary @unoptimized.png -i https://api.tinify.com/shrink
```

### 在 Node.js 中使用

首先在项目中安装 `tinify`：

```
npm install --save tinify
```

使用：

```
var tinify = require("tinify");
tinify.key = "YOUR_API_KEY";

// 选择图片
var source = tinify.fromFile("unoptimized.jpg");

// 压缩并输出
source.toFile("optimized.jpg");
```

### 和 gulp 一起使用

```
var gulp = require('gulp');
var tinypng = require('gulp-tinypng');

gulp.task('tinypng', function() {
    return gulp.src('src/images/**/*') // 要压缩的图片所在位置
     .pipe(tinypng('YOUR_API_KEY')) // 申请的 key
    .pipe(gulp.dest('dist/images')); // 目标输出位置
});
```

Tinypng API 支持所有主流的平台，除了 Node.js，目前还支持 Ruby, PHP, Python, Java 等平台。

除了图片压缩，Tinypng 还支持对图片做缩放，裁切等处理，还支持与 Amazon S3 等云服务一起使用，可以到官网上了解更多信息。

### 参考资料

- [Tinypng API Reference](https://tinypng.com/developers/reference)