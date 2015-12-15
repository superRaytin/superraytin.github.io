---
layout: post
title : 一种优雅的切图方式 —— 前端切图工具 Puzzler
date: 2015-12-14 22:47
disqus: y
---

### 小明的故事

小明是一个苦逼的前端程序猿，但是他有着伟大的编程梦想，他想要精通前端，打通后端，拿下客户端，有招一日成为一只牛逼闪闪的全栈工程狮。为此，工作之余他一有时间就泡在各大技术社区，积极地参与 GitHub 上的开源项目，不断地打怪升级获取新技能...

但是最近小明遇到了烦心事...

公司老是安排一些营销活动页面让他做，这种页面做起来不难但是却繁琐，并且耗时耗力，来一张页面，小明就得这么做：

打开 PS -> 循环 (量像素 -> 切片 -> 导出) -> 编写 HTML/CSS ...

作为一只有追求的工程狮，岂能把宝贵的时间浪费在这种事情里面，小明心想，如果有一个工具能把这些事情给做了，那该有多好啊，我就可以腾出这些时间去做那些更有挑战的事情了...

幸运之神总是会眷顾那些努力的人...

一个偶然的机会，小明接触到了一个叫作 [Puzzler](https://github.com/superRaytin/puzzler) 的工具，当他看到 Puzzler 的介绍：

> Puzzler 是一个高效快速的前端页面切图工具，用于将一张图片快速切割成切片并导出 HTML 文件， 所有的工作都通过可视化拖拽完成，让你从重复的 PSD 切图工作中解放出来。

以及 Puzzler 的功能列表：

- 支持拖拽导入图片，支持 jpg, png 等图片类型
- 灵活的标尺和参考线操作，支持快速地移动拖放
- 支持导出图像切片和 HTML 文件，导出之前还支持图像质量设置，自定义导出模板
- 导出成功后可以一键预览、一键复制源代码
- 操作记录自动恢复，以前切割过的图片可沿用历史记录继续操作
- 支持创建图片热区，快速地拖放操作，并可设置热区的链接、是否新窗口打开和宽高信息
- 全面地快捷键支持
- 便利地用户设置，支持多种常用设置
- 可创建自定义文字内容，文字内容支持 Markdown 格式

刚刚经历加班切图的小明，热泪盈眶，脑中飘起《终于等到你》的旋律，这不就是自己想要的工具嘛！

小明擦了擦眼泪，当即找到了 Puzzler 的 Mac 版本客户端的[下载地址](https://github.com/superRaytin/puzzler)，决定立即试试。

下载好打开软件，小明看到了这样的一个界面：

<img src="https://os.alipayobjects.com/rmsportal/noOkOthsvNodzeT.png" alt="Puzzler" width="800">

于是小明翻出私藏很久的他最爱的女帝照片，拖了进去，准备大展身手，他随便划了几根参考线和热区：

<img src="https://os.alipayobjects.com/rmsportal/sJLTfRarBUFYpnj.png" alt="Puzzler" width="700">

他心想，这个工具的参考线和热区操作还挺灵活的嘛，随便拖来拖去，竟然支持那么多快捷键，神奇的是按住 shift 键还能微调距离和宽高，小明竟然找到了一种在 PS 里操作的感觉。再看看导出是啥样子的，于是他接着点击「导出HTML」，选择完导出位置之后他看到了图片的切片和生成的 HTML 文件：

<img src="https://os.alipayobjects.com/rmsportal/jFRBKuQFaBqzpFz.gif" alt="Puzzler" width="800">

<img src="https://os.alipayobjects.com/rmsportal/QqVcEtfxMQYNYys.png" alt="Puzzler" width="350">

小明打开生成的 HTML 文件，他想要看看在浏览器中是什么样的，看到 Chrome 中表现正常，接着小明开启了他电脑上的虚拟机，他还想看看在 IE 里表现怎么样，本来他想这玩意能支持到 IE 8 就算是不错了，但没想到在老古董 IE 6 里面竟然也完全正常，小明的眼泪再一次止不住地往下流，他心想这下那帮运营不会再说什么了吧。

等等，小明总觉得还少点什么...对了，他突然想到了一个很重要的问题：切完图关掉软件，还能对同一张图沿用以前的参考线、热区等记录继续操作吗？要知道运营改需求可是常有的事，忐忑的小明找到 Puzzler 的[项目地址](https://github.com/superRaytin/puzzler)，咦，竟然还是个开源项目...小明在文档中找到了问题的答案：

> 完全可以。导出 HTML 时，会同时生成一个 `config.json` 的配置文件，用户选择图片时，系统会检查该图片同级目录里是否存在 `config.json` 文件并恢复操作记录。导入图片时进入以前导出的文件夹选择 `origin.jpg` 文件即可。

小明的眼泪...他赶紧抬起头，止住了。

正好老板安排了一个切图的任务，要求他务必今天完成，小明再次打开软件，找到视觉 MM 给他的图片拖了进去，这个图片有点大，但切图经验丰富的小明马上想到了最优的切法，问题是这个工具能做到吗？小明查看了一下软件界面上的操作帮助，很快地掌握了技巧：

<img src="https://os.alipayobjects.com/rmsportal/iLoqlIbkRLlAOdh.gif" alt="Puzzler" width="800">

于是小明花 5 分钟切好了图，他感觉到一阵久违的舒心，小明觉得，如果他遇到了和自己一样的工程狮，他一定要把 Puzzler 推荐给对方，说不定就能随手拯救一只像他这样的猿呢。

切完图的小明满意的伸了个懒腰，看了看窗外天色还早，晚上和女朋友小花去看场电影，小明心想。

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

---

### Q & A

#### Puzzler 适合切什么类型的页面？

营销活动类和纯展示类的页面，这种页面一般只有图片和链接，没有动态数据，非常适合快速自动化切割

#### 我要切很大的图片，怎么办？

Puzzler 提供了「黄金分割」的功能，输入一个值，一键完成中间主区域的设定，导出时自动抹除中间区域的图片像素内容，减少导出的背景图片的体积

#### 需要本地安装什么辅助工具吗？

下载即可运行，不需要安装任何依赖环境~

#### 支持直接拖 PSD 文件进来吗？

拿到 PSD 还要到 PS 里去导出 JPG 再拖进来，略麻烦啊，就不能直接拖 PSD 么...目前还不支持，不过以后会支持！

#### 图片处理怎么实现的？

Puzzler 的图片处理借助了 [image-clipper](https://github.com/superRaytin/image-clipper) 来实现。

image-clipper 是一个使用原生 Canvas API 对图片进行剪缉裁切的 Node 模块，不需要安装任何第三方图片处理库，并且能够很好地兼容浏览器端使用：

> Node.js module for clip & crop JPEG, PNG, WebP images purely using the native Canvas APIs, excellent compatibility with the Browser & Electron & NW.js (Node-webkit), itself doesn't relies on any image processing libraries.

使用示例:

```
var Clipper = require('image-clipper');
Clipper('/path/to/image.jpg', function() {
    this.crop(x, y, width, height)
    .resize(50, 50)
    .quality(80)
    .toFile('/path/to/result.jpg', function() {
       console.log('saved!');
   });
});
```

