---
layout: post
title : Babel6 编译 ES6 继承代码的一个兼容问题（IE <= 10）
date: 2016-03-16 17:28
disqus: y
---

### 先抛问题

先看以下代码：

```js
class Parent {
	constructor() {
		console.log('Parent constructor');
		this.name = 'john';
	}
}

class Child extends Parent {
	constructor() {
		console.log('Child constructor');
		super();
	}
}

const child = new Child();

export default Test;
```

上述代码经过 Babel 6 编译之后在 Chrome / FireFox 中表现完美，但在 IE <= 10 中只会打印子类构造函数的 log，为什么会这样？听我慢慢道来，你也可以直接到文章结尾看解决方案。

### 从继承说起

我们知道，传统 JS 实现继承都是通过原型链，ES3 中最流行的继承方式：

```js
function inherit(Parent) {
	var F = function() {};
	F.prototype = Parent.prototype;
	return new F();
}
function Child() {}
function Parent() {}
Child.prototype = inherit(Parent);
```

ES5 规范了这种继承方式，使用 Object.create 改写以上代码：

```js
Child.prototype = Object.create(Parent.prototype);
```

这两种继承方式其实只实现了“部分继承”，如果要继承定义在父类构造函数中的属性，则需要子类重新声明：

```js
function Child(name) {
	Parent.call(this, name);
}
```

看 Babel 是怎么处理这个问题的：

```js
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null ) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Child = function(Parent) {
  _inherits(Child, Parent);

  function Child() {
      _classCallCheck(this, Child);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Child).apply(this, arguments));
  }

  // ...
}
```

主要看这两句：

```js
Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;

Object.getPrototypeOf(Child).apply(this, arguments)
```

`getPrototypeOf()` 是 ES5 的方法，用于获取对象原型，`setPrototypeOf()` 是 ES6 的方法，用于设置目标对象的原型。上述代码先用 setPrototypeOf 把父类构造函数设为子类构造函数的原型，然后用 getPrototypeOf 获取子类构造函数的原型，看起来这和 `Parent.call(this, name)` 不是一样的么？

### ES2016(ES7) 的静态方法

ES6 提出并规定了静态方法的实现，同时静态属性也作为 ES7 的一个提案得到 Babel 的支持：

```js
Class Parent {
	static name = 'john';
	static method() {};
}
```

静态属性和静态方法都可以被继承，Babel 为了实现此继承，将父类构造函数设置为子类构造函数的原型，以此实现子类构造函数也能继承父类构造函数的属性和方法。

一切看起来很完美，但问题就出在这。

### 原因出在哪？

`getPrototypeOf()` 是 ES5 的方法，IE9+ 都能得到很好的支持，而 `setPrototypeOf()` 是 ES6 的方法，需要到 IE11 才支持，这就导致这段代码 `Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;` 实际执行的是 `subClass.__proto__ = superClass;` 而 `__proto__` 也需要到 IE11 才支持，执行 `Object.getPrototypeOf(Child)` 时得到的实际是 `Function.prototype`，相当于把 Child 当成一个普通函数了，函数也是实例，原型就是 `Function.prototype` 了。


### 解决方案

添加一个 polyfill 解决，以下代码来自 [https://github.com/seznam/IMA.js-babel6-polyfill](https://github.com/seznam/IMA.js-babel6-polyfill)：

```js
(function() {
  var testObject = {};
  if (!(Object.setPrototypeOf || testObject.__proto__)) {
      var nativeGetPrototypeOf = Object.getPrototypeOf;

      Object.getPrototypeOf = function(object) {
          if (object.__proto__) {
              return object.__proto__;
          } else {
              return nativeGetPrototypeOf.call(Object, object);
          }
      }
  }
})();
```

据此改写原生的 `getPrototypeOf` 方法，IE 10 及以下由于不支持 `setPrototypeOf` 和 `__proto__`，Babel 会把父类构造函数赋给子类构造函数的 `__proto__` 属性，当对象有 `__proto__` 时直接返回此属性，属性的值即为父类构造函数。

也可以在 .babelrc 文件中添加以下插件解决：

```js
{
  "presets": ["react", "es2015"],
  "plugins": [
    ["transform-es2015-classes", { "loose": true }],
    "transform-proto-to-assign"
  ]
}
```

---

## 参考资料

- [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [https://phabricator.babeljs.io/T3041](https://phabricator.babeljs.io/T3041)
- [https://github.com/gajus/react-css-modules/issues/84](https://github.com/gajus/react-css-modules/issues/84)
- [https://github.com/babel/babel/blob/master/doc/design/compiler-environment-support.md](https://github.com/babel/babel/blob/master/doc/design/compiler-environment-support.md)
