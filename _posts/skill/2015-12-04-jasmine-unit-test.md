---
layout: post
title : 使用 jasmine 编写单元测试（浏览器）
date: 2015-12-04 13:35
disqus: y
---

### 准备工作

首先在项目根目录中创建一个 tests 目录，用于放置测试使用的文件，当然你也可以使用别的名称。

```
├── tests
│   ├── runner.html
│   ├── browser.test.js
```

`runner.html` 用于访问集成测试的结果页面，在 `index.js` 中编写单元测试。

### 安装

进入 tests 目录，使用 bower 安装 jasmine：

```
bower install jasmine
```

编辑 `runner.html`：

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>jasmine test runner</title>
    <link rel="stylesheet" type="text/css" href="bower_components/jasmine/lib/jasmine-core/jasmine.css">
    <script type="text/javascript" src="bower_components/jasmine/lib/jasmine-core/jasmine.js"></script>
    <script type="text/javascript" src="bower_components/jasmine/lib/jasmine-core/jasmine-html.js"></script>
    <script type="text/javascript" src="bower_components/jasmine/lib/jasmine-core/boot.js"></script>
</head>
<body>
<script src="../../dist/myComponent.js"></script>
<script type="text/javascript" src="browser.test.js"></script>
</body>
</html>
```

### 编写单元测试

```js
describe('tests', function() {
    it('normal works', function() {
        expect(true).toBe(true);
    });
    it('async works', function(done) {
        jQuery.post('data.json', function(data) {
            expect(data.status).toBe('ok');
            done();
        });
    });
});
```

### 运行

这里需要先起一个本地 Web 服务，可以使用 `http-server`，然后在 package.json 中的 scripts 添加一行脚本：

```
scripts: {
    "start": "./node_modules/http-server/bin/http-server ./ -p 9100"
}
```

然后启动服务 `npm start`，访问 http://localhost:9100/tests/runner.html

---

## 参考资料

- [jasmine](https://github.com/jasmine/jasmine)
- [jasmine documentation](http://jasmine.github.io/edge/introduction.html)