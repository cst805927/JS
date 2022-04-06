# 第 **15** 章 **DOM**扩展 

- 本章内容

  - 理解Selectors API 

  - 使用HTML5 DOM扩展

## **15.1 Selectors API**

- jQuery如何获取元素引用？
  - 以CSS选择符查询DOM
- Selectors API Level 1的核心是哪两个方法？
  - querySelector()
  - querySelectorAll()
- 什么类型的实例上会暴露这两个方法？
  - Document
  - Element

### **15.1.1** **querySelector()**

- querySelector()方法接收什么参数？
  - CSS选择符，
- querySelector()方法返回什么？
  - 匹配该模式的第一个后代元素，
  - 如果没有匹配项则返回null

```
// 取得<body>元素 
let body = document.querySelector("body");

// 取得ID为"myDiv"的元素
let myDiv = document.querySelector("#myDiv");

// 取得类名为"selected"的第一个元素 
let selected = document.querySelector(".selected");

// 取得类名为"button"的图片
let img = document.body.querySelector("img.button");

```

- 在Document上使用querySelector()方法时，

  会从哪里开始搜索？

  - 文档元素

- 在Element上使用querySelector()方法时，

  则只会在哪里查询？

  - 从当前元素的后代中  

- 如果选择符有语法错误或碰到不支持的选择符，

  则querySelector()方法会返回什么？

  - 抛出错误

### **15.1.2** **querySelectorAll()** 

- querySelectorAll()方法返回什么？
  - 所有匹配的节点
    - 一个NodeList的静态实例

- NodeList的静态实例是
  - 一个静态的“快照”，
  - 而非“实时”的查询。
- 如果没有匹配项，则返回什么？
  - 空的NodeList实例

- querySelectorAll()也可以什么类型上使用？ 
  - Document
  - DocumentFragment
  - Element

```
// 取得ID为"myDiv"的<div>元素中的所有<em>元素 
let ems = document.getElementById("myDiv").querySelectorAll("em");

// 取得所有类名中包含"selected"的元素
let selecteds = document.querySelectorAll(".selected");

// 取得所有是<p>元素子元素的<strong>元素 
let strongs = document.querySelectorAll("p strong");

```

- NodeList对象如何取得个别元素？
  - for-of循环
  - item()方法
  - 中括号

```
let strongElements = document.querySelectorAll("p strong");

// 以下3个循环的效果一样
for (let strong of strongElements) {
	strong.className = "important";
}

for (let i = 0; i < strongElements.length; ++i) {
	strongElements.item(i).className = "important";
}

for (let i = 0; i < strongElements.length; ++i) {
	strongElements[i].className = "important";
}

```

- 如果选择符有语法错误或碰到不支持的选择符，

  则querySelectorAll()方法会返回什么？

  - 抛出错误。

### **15.1.3** **matches()**