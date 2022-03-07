# 第 1 章 什么是 JavaScript

## 本章内容

- JavaScript 历史回顾
- JavaScript 是什么
- JavaScript 与 ECMAScript 的关系

- JavaScript 的不同版本

## 1.2 JavaScript 实现

- 完整的 JavaScript 实现包含哪几个部分？
  - 核心（ECMAScript）
  - 文档对象模型（DOM）
  - 浏览器对象模型（BOM）

| JavaScript |      |      |
| :--------: | :--: | :--: |
| ECMAScript | DOM  | BOM  |

### 1.2.1 ECMAScript

- ECMAScript 实现的宿主环境有哪些？

  - 几种常见的宿主环境
    - Web 浏览器
    - 服务器端 JavaScript 平台 node.js 
    - 即将淘汰的 Adobe Flash
    
  - 宿主环境的作用是什么？
    - 提供 ECMAScript 的基准实现
    - 提供与环境自身交互的扩展

  - 扩展（比如 DOM）是什么？
    - 使用 ECMAScript 核心类型和语法，
    
      提供特定于环境的额外功能的程序

- 如果不涉及浏览器的话，ECMA-262 到底定义了什么

  在基本的层面，它描述这门语言的如下部分：

  - 语法
  - 类型
  - 语句
  - 关键字
  - 保留字
  - 操作符
  - 全局对象

- ECMAScript 是什么？

  - ECMAScript 是对实现这个规范描述的所有方面的一门语言的称呼

- 实现了 ECMAScript 的语言有哪些？

  - JavaScript
  
  
    - Adobe ActionScript
  

#### 2. ECMAScript 符合性是什么

- 要成为 ECMAScript 实现，必须满足什么条件？
  - 支持 ECMA-262 中描述的所有 ”类型、值、对象、属性、函数，以及程序语法与语义“
  - 支持 Unicode 字符标准

- 符合性实现还可以满足什么要求？

  - 增加 ECMA-262 中未提及的”额外的类型、值、对象、属性和函数“

    （额外内容主要指规范中未给出的新对象或对象的新属性）

  - 支持 ECMA-262 中没有定义的”程序和正则表达式语法“

    （意思是允许修改和扩展内置的正则表达式特性）

- 以上条件为实现开发者基于 ECMAScript 开发语言提供了极大的权限和灵活度


### 1.2.2 DOM

- DOM 是什么？

  - 文档对象模型（DOM，Document Object Model）是一个应用编程接口（API）

- DOM 是用来做什么的？

  - 用于在 HTML 中使用扩展的 XML

- DOM 的原理是什么？

  - DOM 将整个页面抽象为一组分层节点

    使得 HTML 或 XML 页面的每个组成部分都是一种节点，

    每个节点包含不同的数据

  - DOM 通过创建文档树，

    让开发者可以控制网页的内容和结构

- DOM API 有什么用？

  - DOM API 可以用来删除、添加、替换、修改节点

- 比如下面的 HTML 页面

```
<html>
	<head>
		<title>Sample Page</title>
	</head>
	<body>
		<p>Hello World</p>
	</body>
</html>
```

- 这些代码通过 DOM 可以表示为一组分层节点

![image-20220305083443222](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20220305083443222.png)

#### 1. 为什么 DOM 是必需的

- 为了保持 Web 跨平台的本性，

  防止人们面向浏览器开发网页
  
  万维网联盟（W3C，World Wide Web Consortium）开始了制定 DOM 标准的进程

#### 2. DOM 级别

- DOM Level1 
- DOM Level 2
- DOM Level 3
- DOM 4

##### 注意

- DOM 并非只能通过 JavaScript 访问，DOM 被其它很多语言实现了

- 对于浏览器来说

  - DOM 是使用 ECMAScript 实现的

  - DOM 已经成为 JavaScript 语言的一大组成部分

### 1.2.3 BOM

- BOM 是什么？
  - 浏览器对象模型
- 使用 BOM 能做什么？
  - 访问和操作浏览器的窗口
- BOM 主要针对的是什么？
  - 浏览器窗口
  - 子窗口（frame）

- BOM 包含什么内容？
  - 弹出新浏览器窗口的能力
  - 移动、缩放、关闭浏览器窗口的能力
  - navigator 对象，浏览器相关
  - location 对象，浏览器加载页面相关
  - screen 对象，用户屏幕分辨率相关
  - performance 对象，浏览器内存占用、导航行为、时间统计相关
  - 对 cookie 的支持
  - 其它自定义对象，如 XMLHttpRequest 、 IE 的 ActiveXObject

## 1.4 小结

- JavaScript 是什么？
  - JavaScript 是一门用来与网页交互的脚本语言
- JavaScript 包含哪几个组成部分，每个部分用来做什么？
  - ECAMScript：用来提供核心功能
  - 文档对象模型（DOM）：用来与网页内容交互
  - 浏览器对象模型（BOM）：用来与浏览器交互