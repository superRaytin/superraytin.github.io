---
layout: post
title : 如何将一个已存在的目录转换为一个 Git 项目并托管到 GitHub 仓库
date: 2016-02-01 12:35
disqus: y
---

本文只讲一件事：将一个本地维护的项目，转换为一个 Git 项目，并托管到 GitHub。

总共以下几个步骤：

**一、 打开命令行终端，进入项目所在的本地目录，将目录初始化为一个 Git 项目**

```
$ git init
```

此时会在目录中创建一个 `.git` 隐藏文件夹

**二、 将所有文件放进新的本地 git 仓库**

```
$ git add .
```

如果你本地已经有 `.gitignore` 文件，会按照已有规则过滤不需要添加的文件。如果不想要添加所有文件，可以把 `.` 符号换成具体的文件名

**三、 将添加的文件提交到仓库**

```
$ git commit -m "Initial commit"
```

**四、 访问 [GitHub](https://github.com)**

有些时候可能要翻墙

**五、 创建一个新仓库**

为了避免冲突，先不要勾选 `README` 和 `LICENSE` 选项

**六、 在生成的项目主页上，复制仓库地址**

类似于 `https://github.com/superRaytin/alipay-app-ui.git`

**七、 回到命令行终端界面，将本地仓库关联到远程仓库**

```
$ git remote add origin https://github.com/superRaytin/alipay-app-ui.git
```

可运行以下命令查看结果：

```
$ git remote -v
```

**八、 提交代码到 GitHub 仓库**

```
$ git push origin master
```

---

## 参考资料

- [Adding an existing project to GitHub using the command line](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/)
