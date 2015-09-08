---
layout: post
title : Swift 学习笔记：元组和类型别名
date: 2015-09-08 23:33
disqus: y
---

![swift](/images/swift-learn-note-banner.png)

&nbsp;

### 元组

Swift 中的元组（tuples）类似于 JS 中的数组（Array），都可以放置任意类型。它还有点像 JS 中的对象（Object {}），因为可以给单个元素命名，
形成 key-value 结构，所以元组更像是 JS 中数组和对象的结合体。

定义一个元组：

```
let t1 = ("羽牧", 178)
```

t1 是一个类型为 (String, Int) 的元组。

定义的时候还可以给元组中的元素命名：

```
let t2 = (name: "羽牧", height: 178)
```

元组可以分解，分解方式就像是把上述代码反过来写，括号里定义常量或变量名：

```
let (name, height) = t1
println("My name is \(name), and my height is \(height) CM.")
// My name is 羽牧, and my height is 178 CM.
```

还可以通过元素名称来取值：

```
println("My name is \(t2.name), and my height is \(t2.height) CM.")
```

另外，不管有没有给元素命名，都可以通过下标来取值：

```
println("My name is \(t1.0), and my height is \(t1.1) CM.")
```

如果只要一部分元组的值，还可以用 `_` 下划线标注相应的元素：

```
let (name, _) = t1
```

元组的分解过程与 JS ES6 中的解构写法类似：

```
var arr = [1, 2, 3];
var [first, second, third] = arr;
```

相当于：

```
var arr = [1, 2, 3];
var first = arr[0];
var second = arr[1];
var third = arr[2];
```

关于元组的使用场景，官方建议是只在临时组织值的时候用，比如在一个函数中返回多个不同类型的值，如果是创建复杂的数据结构，则建议用类或结构体。

### 类型别名

Swift 中可以用 `typealias` 关键字给现有类型定义一个别名，方便自己识别：

```
typealias Num = Int32
```

上述代码给 Int32 类型取了个别名叫 Num，以后定义一个 Int32 类型变量就可以这样：

```
var num1: Num = 12
```

或者这样：

```
var num2 = Num.max
```

`Num.max` 实际上是调用 `Int32.max`。

