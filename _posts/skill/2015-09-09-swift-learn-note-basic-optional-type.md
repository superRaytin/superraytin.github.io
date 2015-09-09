---
layout: post
title : Swift 学习笔记：可选类型和强制解析
date: 2015-09-09 23:48
disqus: y
---

![swift](/images/swift-learn-note-banner.png)

&nbsp;

### 可选类型

可选类型这个概念初看起来有点难理解，先看一个例子：

```
var str1: String;
println(str1); // 报错
```

上述代码运行会报错 `Variable 'str1' used before being initialized`，变量未初始化就被使用了。

Swift 中声明变量时必须指定值，假如一开始并不能确定变量的值，这时就可以声明变量为一个可选类型。

```
var str1: String?
println(str1); // nil
```

上面代码中，表示 str1 要么是一个字符串，要么是 nil，且只会有这两种情况。nil 不是指针，而是用来表示 `值缺失`，放在 JS 中，可以理解为 null 或 undefined。

如果不给可选类型的变量或常量赋值，则默认会设置为 nil，也可以显式地赋值为 nil:

```
var str1: String?
str1 = nil;
```

`?` 号必须写在类型后面 `Int?`，`var str1?` 是不合法的。

nil 用在 if 语句中:

```
if str1 != nil {
    println("A string: \(str1!)")
}

// str1! 表示明确知道 str1 有值，这个取值过程称为强制解析
```

### 强制解析

可选类型的常量或变量，必须用 `!` 来取值：

```
let str2: String? = "haha";
let forcestr2: String = str2! // 要加感叹号
```

还有一种可选类型叫 `隐式可选类型`，区别只是把类型后面的 `?` 改成 `!`，这时取值就不需要在后面加 `!` 号了：

```
let str2: String! = "haha";
let forcestr2: String = str2 // 不需要加感叹号
```

注意：如果变量有可能会变成 nil 的，不要使用隐式可选类型(!)，要用普通可选类型(?)。
