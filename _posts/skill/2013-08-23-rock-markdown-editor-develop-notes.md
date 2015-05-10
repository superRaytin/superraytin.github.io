---
layout: post
title : Rock! Markdown 编辑器开发简记
date: 2013-08-23 22:13
disqus: y
---

## 前言
因为每周都要写周报，用 Markdown 写文档是我的首选，因为它简洁高效，排版良好。公司办公电脑大都是 Windows 系统，而 Windows 平台下 Markdown 编辑器并不多，其中功能比较全面的当属 Markdownpad，可打开速度每次都要让我菊花一紧，界面也谈不上美观，
没用多久便卸载了，转到用在线编辑器，一个不错的就是 `http://mahua.jser.me`，体验还不错，但在线编辑器虽然方便，却也有其局限性，如果既能写文档，也能将本地众多的 md 文档管理起来，写完之后还能直接发邮件，想想多么酷~！
再加上之前接触到 [Node-webkit](https://github.com/rogerwang/node-webkit) ，于是萌生了自己写一个编辑器的想法。

如果你不了解 Node-webkit 是什么，可以在网上搜一下资料，也可看看 [以 web 的方式写桌面程序 —— Node-Webkit](/2013/07/15/node-webkit-desktop-app-develop/)

## 最终的界面
<img class="lazy" src="/images/rock-markdown-1.png">

## 功能分布
编辑器的布局从上到下依次是：

- 菜单栏
- 工具栏
- 标签栏
- 编辑区
- 预览区
- 状态栏

布局上借鉴了 Markdownpad，菜单栏的实现主要借助了 Node-webkit（以下简称 nw ）的 `Menu` API，用法很简单：
{% highlight javascript %}
var gui = require('nw.gui');
var fileMenu = new gui.Menu();
fileMenu.append({
    label: '新建文档 (Ctrl+N)',
    click: function(){
        // ...
    }
});{% endhighlight %}

菜单栏包含了整个编辑器所有的功能。

工具栏提供一些常用功能的快捷调用。

状态栏显示当前文档的信息。


## 用到的库
编辑区用的是 `CodeMirror`，关于 [CodeMirror](http://codemirror.net)：

> CodeMirror 是一款 “Online Source Editor”，基于 Javascript，短小精悍，实时在线代码高亮显示，他不是某个富文本编辑器的附属产品，他是许多大名鼎鼎的在线代码编辑器的基础库。

解释 Markdown 标记用到 [showdown](https://github.com/coreyti/showdown)

邮件发送使用 Node.js 第三方模块 `Node-mailer`。

## 多标签
考虑到性能原因，编辑器采用了单例模式，即所有产生的标签都是在一个 editor 实例上进行操作，切换标签实际上是将新的一份标签信息
push 到编辑器，当用户新建标签时，即在 cache 里开辟一个新的存储单元，存储这个标签的所有信息，以及后来用户交互中产生的信息。

关闭标签会将相应的存储单元删除，当用户关闭编辑器时会将当前打开的标签进行本地保存。

切换标签时，会对编辑器的内容，以及操作历史进行保存，以便可以撤销 (undo) 和重做 (redo)。

## 数据存储
由于 localStorage 有大小限制，所以我曾想过用本地文件来做数据存储，后来因为一些原因而没有采用：

- 发现 nw 的机制是，当运行 nw 程序时，nw 会在本机用户目录的 appData 里创建临时文件，这些文件就是程序的源代码，程序退出时，临时文件会被删除，保存在程序目录里不可行

- 如果保存在程序目录以外的地方，可能会受到其他程序的影响以及用户的误操作等

综上，最后决定是所有用户个性化数据都用 localStorage 进行保存，只针对一些关键数据作保存。比如保存标签的信息中并不会保存编辑区的内容，而只是保存了
标签所对应文件的url，用户下次打开时会重新读取 url 对应的磁盘文件。


项目地址：[https://github.com/superRaytin/Rock_Markdown](https://github.com/superRaytin/Rock_Markdown)