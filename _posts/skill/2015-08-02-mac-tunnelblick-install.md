---
layout: post
title : Mac OS X 安装 TunnelBlick 过程问题记录
date: 2015-08-02 15:44
disqus: y
---

想在 Mac 上安装个 Mongodb 来玩玩，使用 `brew install mongodb` 安装过程中报了一堆下面这种解析错误：

`curl: (6) Could not resolve host: fossies.org`

一看便知是 GFW 的原故，原先一直用 Shadowsocks 等代理方式来翻 QIANG，但这种方式也只限于浏览器中使用，命令行装包无解，VPN 才是王道。

买完 VPN 并没有一帆风顺，本文主要记录 TunnelBlick 安装过程中遇到的问题。

正常情况下，安装完 TunnelBlick 后，把 VPN 服务商提供的 OpenVPN 文件加载进来即可连接。

开始时按照网络上现有的教程，配置下来发现一些步骤和真实情况有出入，折腾了不少时间才真正连接上，系统 OS X 10.10.3，TunnelBlick 3.4.1，不知是不是因为软件版本和系统不兼容所致。

---

### 无法自动载入配置文件

打开软件后，发现并没有出现引导加载本地配置文件的流程，手动添加 VPN 时提示我：

![buffalo](/images/mac-tunnelblick-1.png)

VPN 服务商提供了一个 config 文件夹，包含很多 `.ovpn` 文件，双击其中任何一个 TunnelBlick 都没有反应，在 TunnelBlick 的网站上找到这么一段话：

```
To create a Tunnelblick VPN Configuration:

1. Create a folder anywhere (on your Desktop works well);
2. If you have only one OpenVPN configuration file, name the folder with the name you want the configuration known by in Tunnelblick. (Otherwise, each configuration will be known in Tunnelblick by the name of the OpenVPN configuration file that it uses);
3. Copy all the files related to the configuration(s) into the folder (see Files Contained in a Tunnelblick VPN Configuration, below);
4. Add an extension of ".tblk" at the end of the folder name. When you do this the icon for folder will change into a Tunnelblick VPN Configuration.
5. Double-click the folder's new icon to install it.
```

按照步骤新建一个文件夹，把所有 VPN 配置文件（如 .ovpn）放进去，再把文件夹重命名为 `.tblk` 后缀名。

---

### 不识别的命令

双击 `.tblk` 新文件后，提示以下错误：

![buffalo](/images/mac-tunnelblick-3.png)

`register-dns` 是 windows 系统专有命令，编辑 VPN 服务商提供的所有 .ovpn 配置文件，把 `register-dns` 这一行删除掉。

再次双击新文件后自动在 TunnelBlick 中打开，提示输入管理员密码以及选择用户范围。会有一定机率没有反应，退出 TunnelBlick 后再尝试终于生效。

![buffalo](/images/mac-tunnelblick-2.png)

---

### 参考

- [https://tunnelblick.net/cConfigT.html](https://tunnelblick.net/cConfigT.html)
- [http://www.sparklabs.com/forum/viewtopic.php?f=3&t=1273](http://www.sparklabs.com/forum/viewtopic.php?f=3&t=1273)
