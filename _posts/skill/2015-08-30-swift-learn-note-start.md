---
layout: post
title : Swift 学习笔记：开篇和环境搭建
date: 2015-08-30 11:12
disqus: y
---

![swift](/images/swift-learn-note-banner.png)

&nbsp;

### 前言

以前学过不少东西，但学习之后大都疏于整理和总结，一段时间之后，记忆难免 「年久失修」，如果没有用于实际工作中，更是如此，总结的益处很多，
一是将所学的知识串联起来，二是对学习过程有个沉淀，日后再来看，也有个见证。总结的目的，首先是帮助自己理清思路，只有做到这样了，才能谈得上帮助别人吧。

### Swift

Swift 是苹果公司在 2014 WWDC 大会上推出的一种编程语言，可以用来开发 IOS 和 OS X 应用程序，比 Object-c 更加简单和容易上手，
据了解，Swift 编译后还是会映射成原来的 Object-c 的运行模型，有人说，Swift 是 Object-c 的一块大大的语法糖，
官方的解释是 「A complete replacement for both the C and Objective-C languages.」

不管怎么样，作为一个 Web 开发者，Swift 的语法看起来非常地亲切，和 Javascript 有几分相似，从这篇开始，我将记录学习 Swift 过程中的收获和感想。

### 准备工作

既然是开发苹果应用程序，那一台 Mac 是必不可少的，除此之外，还需要安装 Xcode，要求 6.0 以上，目前最新版本已经更新到 6.3.2 了，Xcode 是苹果公司官方开发的一款编程软件，
功能非常强大，集界面设计、编码、测试、调试于一身，是开发 IOS 和 OS X 应用程序的必备工具。

### 环境搭建

打开 Xcode，选择 `新建工程`，为了学习方便，模板选择了 OS X 菜单下 `应用程序` 的 `命令行工具`。

![swift](/images/swift-learn-note-start-1.png)

接着填写工程信息，语言一栏选择排在第一位的 `Swift` （是不是可以借此相信苹果推广 Swift 的决心呢？）

![Swift](/images/swift-learn-note-start-2.png)

点击下一步，一个 Swift 工程就创建好了，目标路径中会生成一个以产品名命名的文件夹和一个后缀为 `xcodeproj` 的文件。

![swift](/images/swift-learn-note-start-3.png)

创建好以后就可以开始 Swift 编程之旅了。

![swift](/images/swift-learn-note-start-4.png)