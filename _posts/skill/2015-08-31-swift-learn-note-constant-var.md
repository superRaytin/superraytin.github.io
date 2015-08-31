---
layout: post
title : Swift 学习笔记：常量和变量
date: 2015-08-31 23:13
disqus: y
---

![swift](/images/swift-learn-note-banner.png)

&nbsp;


Swift 中使用 `let` 关键字定义常量，使用 `var` 定义变量，这点和 Javascript 很像，最新的 ES6 标准已经可以用 let 定义常量了，
有一点不同，Swift 中常量的值只能用双引号 `"` 包裹，不能用单引号，而在 JS 中则两者都可以，一行最后面的 `;` 分号可以留也可以不留。
以下两种写法都是可以的：

```
let sex = "male";
var height = "180"
```

### 定义多个常量或变量

和 JS 也是一样的：

```
var v1 = "hello", v2 = 100
```

### 指定类型

Object-C 等编译型语言一般是强类型的，Swift 使用了一种叫 `类型推导` 的方法，根据常量或变量的值反推左侧的类型，也可以一开始就指定类型：

```
var height2:Int = 180;
```

这时候右侧就只能设置整数了，设置其他类型的值则会报错。

### 变量命名

除了上面提到的定义方式，Swift 几乎可以用任何一种字符来命名变量，只要是 unicode 编码的，以下几种方式都是合法的：

```
var 羽牧 = "smart"
var @ = "$"
```

甚至可以用表情来命名，下图是国外某人 @futurepaul 写的代码，很有意思：

![swift](/images/swift-learn-note-constant-1.jpg)

### 输出

输出使用 `println` 和 `print` 方法，区别只是换行与否，Swift 中使用 `\()` 来输出变量，比如输出以上几个变量：

```
println("sex = \(sex), 羽牧 = \(羽牧)")
```

输出结果：

```
sex = male, 羽牧 = smart
```

