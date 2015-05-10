---
layout: post
title : Javascript 在浏览器端创建文件并打包成 zip
date: 2014-04-30 22:12
disqus: y
---

项目叫 JSZip，支持创建文件（文本 or 图片）然后打包成 Zip 包提供给用户下载，所有操作都是在浏览器端完成，并且支持 IE8，JSZip 利用的是 ActiveXObject、Blob 等不太为人所知的 Browser API。

下面是官网的示例，用法比较简洁，我在其中增加了中文注释：

    var zip = new JSZip();

    // 创建一个文本文件，内容为hello World
    zip.file("Hello.txt", "Hello World\n");

    // 创建一个images的文件夹
    var img = zip.folder("images");

    // 创建一个图片文件
    img.file("smile.gif", imgData, {base64: true});

    // 生成blob大对象
    var content = zip.generate({type:"blob"});

    // 打包保存为example.zip
    saveAs(content, "example.zip");

    /*
    example.zip包含以下文件
    Hello.txt
    images/
        smile.gif
    */

项目地址：[https://github.com/Stuk/jszip](https://github.com/Stuk/jszip)