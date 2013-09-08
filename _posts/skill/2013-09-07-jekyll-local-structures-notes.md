---
layout: post
title : windows下本地jekyll博客搭建手记
category : skill
tags : [jekyll]
---
{% include JB/setup %}

### 前言
准备把博客从wordpress搬到github，jekyll成为我的首选，这里主要介绍windows下本地搭建的步骤。之前曾经照着网上的介绍，一直没有成功，发现了不少问题，今天翻了诸多资料，也算是找到了一种可行
的方法，暂且放下网上教程们中要求的ruby，devkit版本，今天发现直接全部用最新的版本，也是可以的。

### 安装Ruby环境和DevKit
直接到rubyInstaller官网下载，目前最新的版本分别是 `Ruby 2.0.0-p247 (x64)` 和 `DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe` ，我的系统是64位，32位的话选择对应版本，
先安装Ruby环境，注意，必须先安装Ruby环境，为免混乱，可以解压至 `C:\Ruby` ,ruby安装成功之后安装DevKit，同样解压至 `C:\DevKit` 。

### 配置
a. 打开CMD，运行以下命令：

    cd C:\DevKit

    ruby dk.rb init

    ruby dk.rb install

b. 完成之后安装jekyll：

    gem install jekyll

可以用 `jekyll --version` 来检查是否安装成功

c. 安装rdiscount，这个是用来解析Markdown标记的解析包。

    gem install rdiscount

### 运行
cd 到工程目录，目前网上大部分教程说的启动服务命令 `jekyll --serve` 都已过时，正确的应该是：

    jekyll serve

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

### 目前网上流传的一些解决办法
1.`http://yanping.me/cn/blog/2012/10/09/chinese-charset-problems-with-jekyll/` 这篇文章给出的解决办法：
修改bash的字符集：在C:\Documents and Settings\用户名下，找到文件.bash_profile，后面加两行:

> set LC_ALL=en_US.UTF-8

> set LANG=en_US.UTF-8

这种方法经过测试并不能解决问题。

2.`http://www.dewen.org/q/5893` 给出的解决办法：

a: 在文件头加上

    # -*- coding:utf-8 -*-

指定运行环境的编码

    ruby --encoding=utf-8

b: 运行

    chcp 65001

前面一种直接无效，后面一种可以起到短暂的效果，但是会有部分功能失效的问题，并且文章打开丢失了模板的头尾，只剩下乱码的文章主体部分。

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

重启jekyll服务，编译成功。

### 参考资料
http://log.medcl.net/item/2012/04/jekyll-encounter-encoding-problems/

http://www.cnblogs.com/purediy/archive/2013/03/07/2948892.html

