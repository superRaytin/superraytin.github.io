---
disqus: y
layout: post
title : Windows 系统 Jekyll 博客搭建手记
date: 2013-09-07 22:27
---

### 前言
准备把博客从 Wordpress 搬到 Github，Jekyll成为我的首选，这里主要介绍 Windows 系统本地搭建的步骤。以前照着网上的介绍操作过，但是没有成功过，遇到了不少问题，今天翻了很多的资料，算是找到了一种比较可行
的方法，之前看到过的网上教程中大都有要求 Ruby，Devkit 的具体某个版本，今天发现全部用最新的版本，也是可以的。

---

### 安装 Ruby 环境和 DevKit
直接到 [rubyInstaller](http://rubyinstaller.org/downloads/) 官网下载，目前最新的版本分别是 `Ruby 2.0.0-p247 (x64)` 和 `DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe` ，我的系统是 64 位，32 位的话选择对应版本，
先安装 Ruby 环境，注意，必须先安装 Ruby 环境，为免混乱，可以解压至 `C:\Ruby` , Ruby 安装成功之后安装 DevKit，同样解压至 `C:\DevKit` 。

---

### 配置
a.打开命令行终端（CMD），运行以下命令：

    cd C:\DevKit

    ruby dk.rb init

    ruby dk.rb install

b.完成之后安装 Jekyll：

```
gem install jekyll
```

可以用 `jekyll --version` 来检查是否安装成功

c.安装 `rdiscount`，这个是用来解析 Markdown 标记的解析包。

    gem install rdiscount

---

### 运行
cd 到工程目录，目前网上大部分教程说的启动服务命令 `jekyll --serve` 都已过时，正确的应该是：

    jekyll serve

---

### 中文支持异常情况
你可能会遇到下面这种情况：

    D:\WebstormProjects\superraytin.github.com>jekyll serve
    Configuration file: D:/WebstormProjects/superraytin.github.com/_config.yml
           Deprecation: Auto-regeneration can no longer be set from your configurati
    on file(s). Use the --watch/-w command-line option instead.
                Source: D:/WebstormProjects/superraytin.github.com
           Destination: D:/WebstormProjects/superraytin.github.com/_site
          Generating... Error reading file D:/WebstormProjects/superraytin.github.co
    m/_posts/life/2013-05-23-i-am-a-test.md: invalid byte sequence in GBK
    error: invalid byte sequence in GBK. Use --trace to view backtrace

或者下面这种情况

    D:\WebstormProjects\superraytin.github.com>jekyll serve
    Configuration file: D:/WebstormProjects/superraytin.github.com/_config.yml
           Deprecation: Auto-regeneration can no longer be set from your configurati
    on file(s). Use the --watch/-w command-line option instead.
                Source: D:/WebstormProjects/superraytin.github.com
           Destination: D:/WebstormProjects/superraytin.github.com/_site
          Generating...   Liquid Exception: invalid byte sequence in GBK in _posts/s
    kill/2011-12-29-jekyll-introduction.md
    error: invalid byte sequence in GBK. Use --trace to view backtrace

---

### 目前网上流传的一些解决办法
1.[http://yanping.me/cn/blog/2012/10/09/chinese-charset-problems-with-jekyll/](http://yanping.me/cn/blog/2012/10/09/chinese-charset-problems-with-jekyll/) 这篇文章给出的解决办法：
修改 bash 的字符集：在 `C:\Documents and Settings\` 用户名下，找到文件 .bash_profile，后面加两行:

> set LC_ALL=en_US.UTF-8

> set LANG=en_US.UTF-8

**这种方法经过测试并不能解决问题**。

2.[http://www.dewen.org/q/5893](http://www.dewen.org/q/5893) 给出的解决办法：

a: 在文件头加上

    # -*- coding:utf-8 -*-

指定运行环境的编码

    ruby --encoding=utf-8

b: 运行

    chcp 65001

**前面一种直接无效，后面一种可以起到短暂的效果，但是会有部分功能失效的问题**，并且文章打开丢失了模板的头尾，只剩下乱码的文章主体部分。

---

### 终极解决办法
解决第一种错误——打开路径 `C:\Ruby200-x64\lib\ruby\gems\2.0.0\gems\jekyll-1.2.0\lib\jekyll`，打开 `convertible.rb`

找到：

    self.content = File.read(File.join(base, name))

替换成：

    self.content = File.read(File.join(base, name), :encoding => "utf-8")

解决第二种错误——打开路径 `C:\Ruby200-x64\lib\ruby\gems\2.0.0\gems\jekyll-1.2.0\lib\jekyll\tags`，打开 `include.rb`

找到：

    source = File.read(File.join(includes_dir, @file))

替换成：

    source = File.read(File.join(includes_dir, @file), :encoding => "utf-8")

重启 Jekyll 服务，编译成功。

---

### markdown 解释中文列表的问题
Jekyll 默认的 markdown 解释引擎是 `maruku`，在解释列表的时候，列表中有英文字符正常，否则会不正常，这种情况需要把解释引擎切换为 `rdiscount`，
具体方法是打开 `_config_yml` 文件，在 `pygments:true` 下面添加一行

    markdown: rdiscount

---

### 参考资料
[http://log.medcl.net/item/2012/04/jekyll-encounter-encoding-problems/](http://log.medcl.net/item/2012/04/jekyll-encounter-encoding-problems/)

[http://www.cnblogs.com/purediy/archive/2013/03/07/2948892.html](http://www.cnblogs.com/purediy/archive/2013/03/07/2948892.html)

[http://cloudaice.com/markdown-list-chinese-problem/](http://cloudaice.com/markdown-list-chinese-problem/)

### 其他
Jekyll 环境搭好之后，每次启动服务都需要 cd 到工程目录，然后运行命令 `jekyll serve`。

是不是觉得有点繁琐呢？

反正我是觉得很烦，这里写了个短小的批处理文件，可以当作是一键启动服务的开关，打开记事本，将下面的命令行拖到里面保存为 `.bat` 文件，放到桌面上，以后双击即可启动服务。

    @echo
    cd D:\WebstormProjects\jekyllBlog
    D:
    jekyll serve
    pause

批处理文件执行效果：

<img src="/images/jekyll-local-1.png">
