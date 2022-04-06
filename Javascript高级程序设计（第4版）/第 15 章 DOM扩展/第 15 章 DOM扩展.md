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

- matches()方法接收什么参数？
  - 一个CSS选择符
- 如果元素匹配则该选择符返回什么？
  - true，
  - 否则返回false

```
if (document.body.matches("body.page1")) {
	// true
}
```

## **15.2** 元素遍历

- Element Traversal API为DOM元素添加了哪5个属性？

  - childElementCount，
    - 返回子元素数量（不包含文本节点和注释）； 

  - firstElementChild，
    - 指向第一个Element类型的子元素

  - lastElementChild，
    - 指向最后一个Element类型的子元素

  - previousElementSibling，
    - 指向前一个Element类型的同胞元素  

  - nextElementSibling，
    - 指向后一个Element类型的同胞元素 

- 过去要以跨浏览器方式遍历特定元素的所有子元素

```
let parentElement = document.getElementById('parent');

let currentChildNode = parentElement.firstChild;

// 没有子元素，firstChild返回null，跳过循环
while (currentChildNode) {
	if (currentChildNode.nodeType === 1) {
		// 如果有元素节点，则做相应处理 
		processChild(currentChildNode);
	}
	
	if (currentChildNode === parentElement.lastChild) {
		break;
	}
	
	currentChildNode = currentChildNode.nextSibling;
}
```

- 使用Element Traversal属性之后，以上代码可以简化如下：

```
let parentElement = document.getElementById('parent');

let currentChildElement = parentElement.firstElementChild;

// 没有子元素，firstElementChild返回null，跳过循环 
while (currentChildElement) {

	// 这就是元素节点，做相应处理 
	processChild(currentChildElement);
	
	if (currentChildElement === parentElement.lastElementChild) {
		break;
	}
	
	currentChildElement = currentChildElement.nextElementSibling;
}
```

## **15.3 HTML5**

### **15.3.1 CSS**类扩展 

#### \01. **getElementsByClassName()** 

- getElementsByClassName()方法接收什么参数？
  - 包含一个或多个类名的字符串，
- getElementsByClassName返回什么？
  - 类名中包含相应类的元素的NodeList。
- 如果提供了多个类名，是否要按顺序？
  - 不用

```
// 取得所有类名中包含"username"和"current"元素
// 这两个类名的顺序无关紧要 
let allCurrentUsernames = document.getElementsByClassName("username current");

// 取得ID为"myDiv"的元素子树中所有包含"selected"类的元素 
let selected = document.getElementById("myDiv").getElementsByClassName("selected")
```

- 在特定元素上调用getElementsByClassName()

  则返回什么？

  - 该元素后代中匹配的元素

#### \02. **classList**属性 

- className是一个字符串，

  所以每次操作之后都需要怎么做才能生效？

  - 重新设置这个值

```
<div class="bd user disabled">...</div>
```

```
// 要删除"user"类 
let targetClass = "user";

// 把类名拆成数组 
let classNames = div.className.split(/\s+/);

// 找到要删除类名的索引 
let idx = classNames.indexOf(targetClass);

// 如果有则删除 
if (idx > -1) {
	classNames.splice(i, 1);
}

// 重新设置类名 
div.className = classNames.join(" ")
```

- classList是一个什么类型的实例？

  - DOMTokenList的实例。

- 如何知道DOMTokenList包含多少项？

  - length属性

- 如何取得DOMTokenList个别的元素？

  - item()
  - 中括号

- DOMTokenList还增加了以下方法。

  - add(*value*)，
    - 向类名列表中添加指定的字符串值value。
    - 如果这个值已经存在，
      - 则什么也不做。 

  - contains(*value*)，
    - 返回布尔值，
    - 表示给定的value是否存在。 

  - remove(*value*)，
    - 从类名列表中删除指定的字符串值value。 

  - toggle(*value*)，
    - 如果类名列表中已经存在指定的value，
      - 则删除；
    - 如果不存在，
      - 则添加。 

```
div.classList.remove("user");
```

```
// 删除"disabled"类
div.classList.remove("disabled");

// 添加"current"类 
div.classList.add("current");

// 切换"user"类 
div.classList.toggle("user");

// 检测类名
if (div.classList.contains("bd") && !div.classList.contains("disabled")) {
	// 执行操作
}

// 迭代类名 
for (let class of div.classList) {
	doStuff(class);
}
```

### **15.3.2** 焦点管理

- document.activeElement包含什么？
  - 当前拥有焦点的DOM元素。
- 页面加载时，如何让某个元素自动获得焦点？
  - 按Tab键
  - 代码中使用focus()方法

```
let button = document.getElementById("myButton");
button.focus();
console.log(document.activeElement === button); // true
```

- 默认情况下，document.activeElement的值是什么?
  - 在页面刚加载完之后为document.body
  - 在页面完全加载之前为null。

- document.hasFocus()方法返回什么？
  - 布尔值，
  - 表示文档是否拥有焦点： 

```
let button = document.getElementById("myButton");
button.focus();
console.log(document.hasFocus()); // true
```

### **15.3.3** **HTMLDocument**扩展

#### \01. **readyState**属性

- document.readyState属性有两个可能的值
  - loading，
    - 表示文档正在加载； 
  - complete，
    - 表示文档加载完成。

```
if (document.readyState == "complete"){
	// 执行操作 
}
```

#### \02. **compatMode**属性

- compatMode属性表示什么？

  - 浏览器当前处于什么渲染模式

  - 标准模式下"CSS1Compat"
  - 混杂模式下"BackCompat" 

```
if (document.compatMode == "CSS1Compat") {
	console.log("Standards mode");
} else {
	console.log("Quirks mode");
}
```

#### \03. **head**属性 

- document.head属性指向什么？
  - 文档的\<head>元素

```
let head = document.head;
```

### **15.3.4** 字符集属性

- characterSet属性表示什么？
  - 文档实际使用的字符集，

- 如何修改文档使用的字符集？
  - \<meta>元素
  - 响应头
  - characterSeet属性

```
console.log(document.characterSet); // "UTF-16" document.characterSet = "UTF-8";
```

### **15.3.5** 自定义数据属性 

- 如何指定非标准的属性？
  - 使用前缀data-

```
<div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>
```

- 如何访问自定义数据属性？
  - dataset属性

- dataset属性是一个什么类型的实例？
  - DOMStringMap
- dataset包含什么？
  - 一组键/值对映射。 
- 元素的每个data-name属性中的什么作为键？
  - data-后面的字符串
  - data-myname、data-myName
    - myname
  - data-my-name、data-My-Name
    - myName

```
// 本例中使用的方法仅用于示范
let div = document.getElementById("myDiv");

// 取得自定义数据属性的值 
let appId = div.dataset.appId;
let myName = div.dataset.myname;

// 设置自定义数据属性的值 
div.dataset.appId = 23456;
div.dataset.myname = "Michael";

// 有"myname"吗？ 
if (div.dataset.myname) {
	console.log(`Hello, ${div.dataset.myname}`);
}
```

- 自定义数据属性非常适合什么场景？
  - 需要给元素附加某些数据，
    - 比如链接追踪和
    - 在聚合应用程序中标识页面的不同部分
