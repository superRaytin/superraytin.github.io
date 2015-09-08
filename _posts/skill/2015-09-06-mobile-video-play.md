---
layout: post
title : 移动端视频播放那些事儿
date: 2015-09-06 18:19
disqus: y
---

HTML5  `<video>` 的出现，为浏览器中的视频播放带来了很大的进步，PC 端上表现很好，看看 Youtube 的 H5 播放器就知道了，但在移动端却有各种各样的限制，本篇即是实战之后的小结，主要讲讲那些和 PC 端不同的地方，如果其中有错误的地方，欢迎指正。

## 自动播放

苹果出于流量损耗的考虑，禁止了那些非用户输入触发的播放动作，这意味着给 `video` 标签增加 `preload` 及 `autoplay` 属性都是无效的，并且也无法使用 JS 的 `play()` 和 `load()` 方法来播放和加载视频，除非是用户手动触发。

`audio` 音频播放同样适用上面的规则。

以下是官方说明：

> In Safari on iOS (for all devices, including iPad), where the user may be on a cellular network and be charged per data unit, `preload` and `autoplay` are disabled. No data is loaded until the user initiates it. This means the JavaScript `play()` and `load()` methods are also inactive until the user initiates playback, unless the `play()` or `load()` method is triggered by user action. In other words, a user-initiated Play button works, but an `onLoad="play()"` event does not.

举个栗子，这样可以播放（有用户输入）：

```
<video id="myMovie"></video>
<input type="button" value="Play" onclick="document.myMovie.play()">
```

这样则不行（没有用户输入）：

```
<body onload="document.myMovie.play()">
```

其实如果苹果只是出于流量上的考虑，完全可以换种思路，在非 WI-FI 网络下这种考虑是合理的，但在 WI-FI 网络下应该放开 preload 和 autoplay 的功能。

不过从产品设计上来说，自动播放并不是一个好的体验，不到万不得已应尽量避免使用。

安卓基本上面临着和 IOS 一样的问题，限于测试机数量，只测了少部分机型，而在海量的安卓机型之中，不排除有些厂商会通过修改底层规则来支持视频自动播放。

## 全屏问题

IOS 上播放即会自动全屏，所以不存在此问题，并且全屏之后自带前进、后退、播放/暂停、时间进度等功能，完全不用操心。

安卓机型支持不一，测试过程用到的华为 G7-TL00、联想 K3 Note、三星 Note 2、小米 3 不支持（诡异的是红米 Note 却支持，大概是 MIUI 版本不一致，规则有变化）

解决办法，可以针对安卓和 IOS 做不同策略，安卓环境下，点击播放时跳到单独页面播放视频，这也是我们目前用的解决方案。

## crash 问题

在应用的 H5 容器环境中，在 HTML 代码中直接放置 `video` 或 `audio` 标签可能会有一定机率导致应用 crash，解决方案是动态创建 `video` 或 `audio` 来改善或避免此问题。

以上问题和所使用的浏览器有关系，如果是在 app 的 webview 窗口中，则和 app 使用的浏览器内核有关，一般来说，上面所列只针对使用默认浏览器内核。

## H5 播放器组件

如果在移动端开发中要用到视频播放，不建议使用原生方式来写，除非是以下两种情况：

- 非常了解各种游戏规则和兼容差异
- 项目只需要支持 IOS

除此之外，建议使用专门的播放器组件，组件一般封装了很多的兼容差异性，没必要去重复造轮子，把时间花在业务逻辑实现上即可。

这里推荐两款：

### [PrismPlayer](http://prism.tv.taobao.org/)

这是淘宝某前端团队做的一个组件，可以很方便地定制播放器的功能，有专人维护，推荐使用。

### [Video.js](http://www.videojs.com/)

优秀的开源播放器组件，历史“悠久”，Star 过万，配置丰富，各种细节做得很到位。

以上两款组件都支持 flash 和 video 方案，移动端使用 video 方式，由于不用加载插件，速度会比 flash 提高不少。

### 其他

`<video>` 支持 MP4, WebM, Ogg 三种视频格式，其中 MP4 格式支持最好，视频建议使用 H.264 编码，如果想要更好的兼容性，可以把这 3 种格式视频都制作好，用以下方式引用：

```
<video>
 <source src="http://example.com/xxx.mp4" type='video/mp4' />
 <source src="http://example.com/xxx.webm" type='video/webm' />
 <source src="http://example.com/xxx.ogv" type='video/ogg' />
<video>
```

关于视频格式，阮一峰老师早些年还翻译过一篇文章 [HTML5的视频格式之争](http://www.ruanyifeng.com/blog/2010/05/html5_codec_fight.html)，非常有意思，对了解这其中的渊源也很有帮助。

视频大小理论上没有限制，但考虑到移动端特点，视频大小与时长应尽量压缩。

网络上这篇 [移动端HTML5&lt;video&gt;视频播放优化实践](http://www.xuanfengge.com/html5-video-play.html) 文章，对移动端 `<video>` 的表现作了详细的对比，数据很详尽，也非常值得一读。

## 参考资料

- [https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/](https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW1)
- [http://www.w3.org/TR/html5/embedded-content-0.html#the-video-element](http://www.w3.org/TR/html5/embedded-content-0.html#the-video-element)
- [https://msdn.microsoft.com/library/hh924820.aspx](https://msdn.microsoft.com/library/hh924820.aspx)
- [http://caniuse.com/#search=video](http://caniuse.com/#search=video)

