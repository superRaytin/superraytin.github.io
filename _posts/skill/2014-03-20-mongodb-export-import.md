---
layout: post
title : MongoDB 数据的导入和导出
date: 2014-03-20 22:13
disqus: y
---

首先 CD 到 MongoDB 的安装目录，接着 CD 到 bin 目录，以我本机地址为例

    cd D:\MongoDB
    cd bin

---

### 导入

    mongoimport -d testDB -c categories backdata/categories.dat

参数说明：

* d - 库名
* c - 表名
* o - 导出位置（相对当前路径）

---

### 导出

    mongoexport -d testDB -c categories -o categories.dat

参数与导入操作一样

---

### 为什么不能批量导入导出？

找来找去，MongoDB 貌似没有提供批量导出的工具，目前是对指定数据库针对单表导入导出。