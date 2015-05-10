---
layout: post
title : 以 web 的方式写桌面程序 —— Node-webkit
date: 2013-07-15 22:13
---

Node.js 的火热程度即使我不说，想来你也听说过很多次了，这里必须要说说 Node 平台迅速崛起的一匹黑马 —— Node-webkit，其实也不能称之为 **Node** 平台的黑马，因为它并不是作为 Node 的模块存在 —— 虽然作者也曾尝试这么干过，大概有许多人也像我一样被它的名字所误导了。

引述一段网上的介绍让你更清楚 Node-webkit 是个什么东西：

> Node-webkit 是一个支持跨操作系统（Windows，Linux，MacOS）的利用流行的 Web 技术（Node.JS, JavaScript，HTML5）来编写应用程序的平台。应用程序开发人员可以轻松的利用 Web 技术来实现各种应用程序。Node-webkit 性能和特色已经让它成为当今世界领先的 Web 技术应用程序平台。

官方的解释是 `Web 应用程序运行时环境`，简单来说就是，你可以利用你所知道的几乎所有 web 技术来构建本地应用程序，HTML5、JS、Nodejs、jQuery 等等。

如果你正好是一名 `Web 开发人员`，第一次听到这样的介绍 —— 那么你一定会为此血液沸腾的（冷血动物不算），这简直把我的技术三观给颠覆了，就像是哥伦布发现新大陆时的心情 —— 除了激动还是激动，作为一名 Jser，新大陆就是从未接触过的桌面程序开发领域，
载着我向新大陆前进的则是 Node-webkit！第一次感觉 Javascript 如此强大，就像 $ 美元，通向世界。

将 Node 和 Webkit 这两个一般人认为无交集的项目结合在一起，不得不佩服作者的创意，使用 Node-webkit 开发本地程序，除了可以尽情地使用第三方 Node 模块，还可以利用 Node-webkit 封装的另外一层调用系统级别的API，比如剪贴板、程序窗口、系统托盘、文件对话框、Shell 等等，但现在与系统 UI 交互的
API 数量还有些少，可能也有安全层面的考虑吧，不过从现在项目的更新频率来看，相信以后会越来越强大的。

Node-webkit 项目地址：[https://github.com/rogerwang/node-webkit](https://github.com/rogerwang/node-webkit)