# 第 **16** 章 **DOM2**和**DOM3**

- 本章内容

  - DOM2到DOM3的变化 

  - 操作样式的DOM API 

  - DOM遍历与范围 

- **DOM Core**：

  - 在DOM1核心部分的基础上，

    为节点增加方法和属性。

- **DOM Views**：
  
  - 定义基于样式信息的不同视图。 
  
- **DOM Events**：
  
  - 定义通过事件实现DOM文档交互。 
  
- **DOM Style**：
  
  - 定义以编程方式访问和修改CSS样式的接口。 
  
- **DOM Traversal and Range**：
  
  - 新增遍历DOM文档及选择文档内容的接口。 
  
- **DOM HTML**：

  - 在DOM1 HTML部分的基础上，

    增加属性、方法和 新接口。 

- **DOM Mutation Observers**：

  - 定义基于DOM变化触发回调的接口。 

  - 这个模块是DOM4级模块，用于取代Mutation Events。 

## **16.1 DOM**的演进 

### **16.1.1 XML**命名空间 

- XML命名空间可以实现什么？

  - 在一个格式规范的文档中混用不同的XML语言，

    而不必担心元素命名冲突。

- 严格来讲，XML命名空间在哪里才支持？
  - XHTML
  - HTML并不支持
- XHTML的命名空间是什么？ 
  - "http://www.w3.org/1999/xhtml"，
- XHTML的命名空间应该包含在哪里？
  - 任何格式规范的XHTML页面的\<html>元素中

```
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Example XHTML page</title>
  </head>
  <body>
    Hello world!
  </body>
</html>

```

- 上述例子中所有元素都默认属于XHTML命名空间。
- 如何使用xmlns给命名空间创建一个前缀？
  - 格式为“xmlns: 前缀”

```
<xhtml:html xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xhtml:head>
    <xhtml:title>Example XHTML page</xhtml:title>
  </xhtml:head>
  <xhtml:body>
    Hello world!
  </xhtml:body>
</xhtml:html>

```

- 属性是否可以加上命名空间前缀？
  - 可以

```
<xhtml:html xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xhtml:head>
    <xhtml:title>Example XHTML page</xhtml:title>
  </xhtml:head>
  <xhtml:body xhtml:class="home">
    Hello world!
  </xhtml:body>
</xhtml:html>

```

- 如果文档中只使用一种XML语言，

  那么命名空间前缀是否有必要？

  - 没必要

- 命名空间前缀什么时候有用？
  - 一个文档混合使用多种XML语言时

```
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Example XHTML page</title>
  </head>
  <body>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      style="width: 100%; height: 100%"
    >
      <rect x="0" y="0" width="100" height="100" style="fill: red" />
    </svg>
  </body>
</html>

```

- 在这个例子中，\<svg>元素设置自己的命名空间，

  目的是什么？

  - 将其标识为当前文档的外来元素

  - \<svg>元素及其属性，包括它的所有后代

    都会被认为属于

    "https://www.w3.org/2000/svg"命名空间

#### \01. **Node**的变化

- 在DOM2中，Node类型包含哪些特定于命名空间的属性？ 

  - localName，
    - 不包含命名空间前缀的节点名； 

  - namespaceURI，
    - 节点的命名空间URL，如果未指定则为null； 

  - prefix，
    - 命名空间前缀，如果未指定则为null。 

- 在节点使用命名空间前缀的情况下，nodeName等于什么？

  - prefix + ":" + localName

```
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Example XHTML page</title>
  </head>
  <body>
    <s:svg
      xmlns:s="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 100 100"
      style="width: 100%; height: 100%"
    >
      <s:rect x="0" y="0" width="100" height="100" style="fill: red" />
    </s:svg>
  </body>
</html>

```

- 其中的\<html>元素的

  - localName、tagName
    - "html"，
  - namespaceURL 
    - "http://www.w3.org/1999/xhtml"
  - prefix
    - null。

- 对于\<s:svg>元素

  - localName
    - "svg"
  - tagName
    - "s:svg"
  - namespaceURI
    - "https://www.w3.org/2000/svg"， 

  - prefix
    - "s"。

- DOM3增加了哪些与命名空间相关的方法

  - isDefaultNamespace(*namespaceURI*)，
    - 返回布尔值，
    - 表示*namespaceURI*是否为节点的默认命名空间； 

  - lookupNamespaceURI(*prefix*)，
    - 返回给定*prefix*的命名空间URI； 

  - lookupPrefix(*namespaceURI*)，
    - 返回给定*namespaceURI*的前缀。 

```
console.log(document.body.isDefaultNamespace("http://www.w3.org/1999/ xhtml")); // true

// 假设svg包含对<s:svg>元素的引用 
console.log(svg.lookupPrefix("http://www.w3.org/2000/svg")); // "s" 

console.log(svg.lookupNamespaceURI("s"));
 // "http://www.w3.org/2000/svg"
```

#### \02. **Document**的变化 

- DOM2在Document类型上新增了哪些

  命名空间特定的方法？ 

  - createElementNS(*namespaceURI*, *tagName*)，

    - 以给定的标签名*tagName*

      创建指定命名空间*namespaceURI*的一个新元素； 

  - createAttributeNS(*namespaceURI*, *attributeName*)，

    - 以给定的属性名*attributeName*

      创建指定命名空间*namespaceURI*的一个新属性； 

  - getElementsByTagNameNS(*namespaceURI*, *tagName*)，

    - 返回指定命名空间*namespaceURI*中

      所有标签名为*tagName*的元素的NodeList。 

- 使用这些方法都需要传入什么？

  - 相应的命名空间URI

    （不是命名空间前缀）

```
// 创建一个新SVG元素 
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

// 创建一个任意命名空间的新属性 
let att = document.createAttributeNS("http://www.somewhere.com", "random");

// 获取所有XHTML元素 
let elems = document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "*");
```

- 这些命名空间特定的方法只在什么时候才有用？
  - 文档中包含两个或两个以上命名空间  

#### \03. **Element**的变化

- getAttributeNS(*namespaceURI*, *localName*)，

  - 取得指定命名空间*namespaceURI*中

    名为*localName*的属性； 

- getAttributeNodeNS(*namespaceURI*, *localName*)，

  - 取得指定命名空间*namespaceURI*中

    名为*localName*的属性节点； 

- getElementsByTagNameNS(*namespaceURI*, *tagName*)，

  - 取得指定命名空间*namespaceURI*中

    标签名为*tagName*的元素的NodeList； 

- hasAttributeNS(*namespaceURI*, *localName*)，

  - 返回布尔值

  - 表示元素中是否有命名空间*namespaceURI*下

    名为*localName*的属性 

- removeAttributeNS(*namespaceURI*, *localName*)，

  - 删除指定命名空间namespaceURI*中*

    名为*localName*的属性； 

- setAttributeNS(*namespaceURI*, *qualifiedName*, *value*)，

  - 设置指定命名空间*namespaceURI*中

    名为*qualifiedName*的属性为*value*； 

- setAttributeNodeNS(*attNode*)，
  - 为元素设置（添加）包含命名空间信息的属性节点*attNode*。 

#### \04. **NamedNodeMap**的变化 

- NamedNodeMap也增加了哪些处理命名空间的方法？
  - getNamedItemNS(*namespaceURI*, *localName*)
    - 取得指定命名空间*namespaceURI*中
    - 名为*localName*的项； 

- removeNamedItemNS(*namespaceURI*, *localName*)

  - 删除指定命名空间*namespaceURI*中

    名为*localName*的项 

- setNamedItemNS(*node*)
  - 为元素设置（添加）包含命名空间信息的节点。 

- 这些方法很少使用，因为通常都是使用元素来访问属性。

### **16.1.2** 其他变化

#### \01. **DocumentType**的变化 

- publicId、systemId属性表示什么？

  - 文档类型声明中有效

    但无法使用DOM1 API访问的数据

```
<!DOCTYPE HTML PUBLIC "-// W3C// DTD HTML 4.01// EN" "http://www.w3.org/TR/html4/strict.dtd">
```

- 其publicId是"-// W3C// DTD HTML 4.01// EN"，
- 而systemId是"http://www.w3.org/TR/html4/strict.dtd"。

```
console.log(document.doctype.publicId); console.log(document.doctype.systemId);
```

- 通常在网页中很少需要访问这些信息。 

- internalSubset用于什么？
  - 访问文档类型声明中可能包含的额外定义

```
<!DOCTYPE html PUBLIC "-// W3C// DTD XHTML 1.0 Strict// EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd" [<!ELEMENT name (#PCDATA)>] >
```

- document.doctype.internalSubset会返回什么？

  - " \<!ELEMENT name (#PCDATA)>"。

- HTML文档中几乎不会涉及文档类型的内部子集，

  XML文档中稍微常用一些

#### \02. **Document**的变化 

- importNode()方法用于什么？

  - 从其他文档获取一个节点

    并导入到新文档，

    以便将其插入新文档

- 每个节点都有一个ownerDocument属性，表示什么？

  - 所属文档。

- 如果调用appendChild()方法时传入节点的ownerDocument不是指向当前文档，则会导致什么？

  - 发生错误。

- 调用importNode()导入其他文档的节点会返回什么？

  - 一个新节点

  - 这个新节点的ownerDocument属性是正确的。 

- importNode()方法接收什么参数？
  - 要复制的节点
  - 表示是否同时复制子树的布尔值，
- importNode()方法返回什么？
  - 适合在当前文档中使用的新节点。

```
// 导入节点及所有后代 
let newNode = document.importNode(oldNode, true); document.body.appendChild(newNode);
```

- defaultView属性是什么？
  - 指向拥有当前文档的窗口（或窗格\<frame>）的指针。

```
let parentWindow = document.defaultView || document.parentWindow;
```

- document.implementation对象两个方法：
  - createDocumentType()
  - createDocument()。
- createDocumentType()用于什么？
  - 创建DocumentType类型的新节点
- createDocumentType()接收什么参数？
  - 文档类型名称、
  - publicId
  - systemId

```
let doctype = document.implementation.createDocumentType("html", "-// W3C// DTD HTML 4.01// EN", "http://www.w3.org/TR/html4/strict.dtd");
```

- createDocumentType()只在什么时候才会用到？
  - 创建新文档
    - 因为已有文档的文档类型不可更改
- 如何创建新文档？
  - 使用createDocument()方法。
- createDocument()接收什么参数？
  - 文档元素的namespaceURI
  - 文档元素的标签名
  - 文档类型

```
let doc = document.implementation.createDocument("", "root", null);
```

- 这个空文档没有命名空间和文档类型，

  只指定了\<root>作为文档元素

- 如何创建一个XHTML文档

```
let doctype = document.implementation.createDocumentType("html", "-// W3C// DTD XHTML 1.0 Strict// EN", "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"); 

let doc = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", doctype);
```

- document.implamentation对象

  createHTMLDocument()方法

- createHTMLDocument()方法可以做什么？
  - 创建一个完整的HTML文档，
  - 包含\<html>、\<head>、\<title>和\<body>元素。
- createHTMLDocument()接收什么参数？
  - 新创建文档的标题（放到\<title>元素中）
- createHTMLDocument()返回什么？
  - 一个新的HTML文档。

```
let htmldoc = document.implementation.createHTMLDocument("New Doc"); 

console.log(htmldoc.title); // "New Doc" console.log(typeof htmldoc.body); // "object"
```

- createHTMLDocument()方法创建的对象是什么实例？
  - HTMLDocument类型的实例，
  - 因此包括该类型所有相关的方法和属性，
    - 包括title和body属性。 

#### \03. **Node**的变化

- isSameNode()和isEqualNode()接收什么参数？

  - 一个节点

- 如果这个节点与参考节点相同或相等，则返回什么？

  - true

- 节点相同，意味着什么？

  - 引用同一个对象

- 节点相等，意味着什么？

  - 节点类型相同，
  - 拥有相等的属性（nodeName、nodeValue等），
  - childNodes也相等 

  （即同样的位置包含相等的值）

```
let div1 = document.createElement("div");

div1.setAttribute("class", "box");

let div2 = document.createElement("div");

div2.setAttribute("class", "box");



console.log(div1.isEqualNode(div2)); // true 

console.log(div1.isSameNode(div2)); // false
```

- setUserData()方法接收什么参数？
  - 键
  - 值
  - 处理函数，
- setUserData()用于什么？
  - 给节点追加数据

- 如何把数据添加到一个节点？

```
document.body.setUserData("name", "Nicholas", function() {});
```

- 如何再取得这个信息？
  - 通过相同的键

```
let value = document.body.getUserData("name")
```

- setUserData()的处理函数会在什么时候执行？

  - 节点

    被复制、删除、重命名或导入其他文档的时候

- 处理函数接收什么参数？

  - 表示操作类型的数值
    - 1代表复制，
    - 2代表导入，
    - 3代表删除，
    - 4代表重命名
  - 数据的键、
  - 数据的值、
  - 源节点
  - 目标节点

- 处理函数删除节点时，源节点为什么？

  - null

- 除复制外，目标节点都为什么？

  - null。

```
let div = document.createElement("div");

div.setUserData("name", "Nicholas", function (operation, key, value, src, dest) {
    if (operation == 1) {
        dest.setUserData(key, value, function () {});
    }
});

let newDiv = div.cloneNode(true);

console.log(newDiv.getUserData("name")); // "Nicholas"
```

#### \04. 内嵌窗格的变化 

- 给HTMLIFrameElement（即\<iframe>，内嵌窗格）类型 

  属性contentDocument

- contentDocument属性包含什么？

  - 代表子内嵌窗格中内容的document对象的指针

```
let iframe = document.getElementById("myIframe"); let iframeDoc = iframe.contentDocument;
```

- contentDocument属性是什么的实例？
  - Document
  - 拥有所有文档属性和方法
    - 可以像使用其他HTML文档一样使用它。
- 属性contentWindow返回什么？
  - 相应窗格的window对象，
    - 这个对象上有一个document属性

- 跨源访问子内嵌窗格的document对象会有什么问题？
  - 受到安全限制

- 如果内嵌窗格中加载了不同域名（或子域名）的页面，

  或者该页面使用了不同协议，

  则访问其document对象会发生什么？

  - 抛出错误。

## **16.2** 样式 

- HTML中的样式有3种定义方式？
  - 外部样式表（通过\<link>元素）
  - 文档样式表（使用\<style>元素）
  - 元素特定样式（使用style属性）

### **16.2.1** 存取元素样式 

- style属性是什么类型的实例？

  - CSSStyleDeclaration

    - 包含通过HTML style属性

      为元素设置的所有样式信息，

    - 但不包含从文档样式和外部样式中继承来的样式。

- CSS属性名使用什么表示法？

  - 连字符
  - （如background-image）

- 在JavaScript中CSS属性必须转换为什么形式？

  - 驼峰大小写
  - （如 backgroundImage）

- 常用的CSS属性与style对象中等价属性

![image-20220410214004628](第 16 章 DOM2和DOM3.assets/image-20220410214004628.png)

- 有一个CSS属性名不能直接转换？
  - float。
  - 因为float是JavaScript的保留字
  - 它在style对象中对应的属性应该是cssFloat。

```
let myDiv = document.getElementById("myDiv");

// 设置背景颜色 
myDiv.style.backgroundColor = "red";

// 修改大小
myDiv.style.width = "100px";
myDiv.style.height = "200px";

// 设置边框 
myDiv.style.border = "1px solid black";
```

- 所有尺寸是否必须包含单位？
  - 在标准模式下，必须包含单位
  - 在混杂模式下，可以把style.width设置为"20"
- 如果是在标准模式下，把style.width设置为"20"会怎么样？
  - 被忽略，
  - 因为没有单位。
- 实践中， 最好一直加上单位。 

```
<div id="myDiv" style="background-color: blue; width: 10px; height: 25px"></div>
```

 

```
console.log(myDiv.style.backgroundColor); // "blue" 

console.log(myDiv.style.width); // "10px"

console.log(myDiv.style.height); // "25px"
```

- 如果元素上没有style属性，则style对象包含什么？
  - 所有可能的CSS属性的空值。

#### \01. **DOM**样式属性和方法

- style对象属性和方法

  - cssText
    - CSS代码 

  - length
    - CSS属性数量 

  - parentRule
    - CSSRule对象

  - getPropertyCSSValue(*propertyName*)，
    - （已废弃）。 

  - getPropertyPriority(*propertyName*)，
    - 如果使用了!important
      - 则返回"important"，
    - 否则返回空字符串。 

  - getPropertyValue(*propertyName*)，
    - 返回属性的字符串值。 

  - item(*index*)，
    - 返回索引为*index*的CSS属性名。 

  - removeProperty(*propertyName*)，
    - 删除CSS属性

  - setProperty(*propertyName, value, priority*)，

    - 设置CSS属性

      - 值为value

      - priority是"important"或空字符串

- cssText属性可以做什么？
  - 存取CSS代码。
- 在读模式下，cssText返回什么？
  - CSS代码
- 在写模式下，cssText执行什么操作？
  - 重写style属性的值

```
myDiv.style.cssText = "width: 25px; height: 100px; background-color: green"; 

console.log(myDiv.style.cssText);
```

- style对象如何取得相应位置的CSS属性名？
  - 中括号
  - item()

```
for (let i = 0, len = myDiv.style.length; i < len; i++) {
    console.log(myDiv.style[i]);
    // 或者用myDiv.style.item(i)
}
```

- 如何根据属性名取得属性的值？
  - getPropertyValue()

```
let prop, value, i, len;
for (i = 0, len = myDiv.style.length; i < len; i++) {
    prop = myDiv.style[i];
    // 或者用myDiv.style.item(i) 
    
    value = myDiv.style.getPropertyValue(prop);
    console.log(`prop: ${value}`);
}
```

- getPropertyValue()方法返回什么？
  - CSS属性值的字符串表示。
- 如何获取CSSValue对象？
  - getPropertyCSSValue() 

- CSSValue对象有两个属性？
  - cssText
  - cssValueType
- cssValueType是什么？
  - 一个数值常量， 
  - 表示当前值的类型
    - 0代表继承的值
    - 1代表原始值
    - 2代表列表
    - 3 代表自定义值

```
let prop, value, i, len;
for (i = 0, len = myDiv.style.length; i < len; i++) {
    prop = myDiv.style[i];
    // alternately, myDiv.style.item(i)
    
    value = myDiv.style.getPropertyCSSValue(prop);
    
    console.log(`prop: ${value.cssText} (${value.cssValueType})`);
}
```

- removeProperty()方法用于什么？
  - 删除CSS属性 

- 删除属性意味着会应用什么？
  - 该属性的默认样式

```
myDiv.style.removeProperty("border");
```

#### \02. 计算样式

- document.defaultView上增加了 

  getComputedStyle()方法。

- getComputedStyle()方法接收两个参数？

  - 要计算样式的元素
  - 伪元素字符串

- 如果不需要查询伪元素，则第二个参数可以传什么？

  - null

- getComputedStyle()方法返回什么？

  - 一个CSSStyleDeclaration对象
    - 包含元素的计算样式

```
<!DOCTYPE html>
<html>
  <head>
    <title>Computed Styles Example</title>
    <style type="text/css">
      #myDiv {
        background-color: blue;
        width: 100px;
        height: 200px;
      }
    </style>
  </head>
  <body>
    <div
      id="myDiv"
      style="background-color: red; border: 1px solid black"
    ></div>
  </body>
</html>

```

- 如何从div元素获取了计算样式？

```
let myDiv = document.getElementById("myDiv");

let computedStyle = document.defaultView.getComputedStyle(myDiv, null);

console.log(computedStyle.backgroundColor); // "red" 

console.log(computedStyle.width); // "100px" 

console.log(computedStyle.height); // "200px" 

console.log(computedStyle.border); // "1px solid black"（在某些浏览器中）
```

- 在所有浏览器中计算样式是否只读？
  - 是 

- 是否能修改getComputedStyle()方法返回的对象？
  - 不能
- 是否有默认值的CSS属性出现在计算样式里？
  - 是
  - 因为计算样式包含浏览器内部样式表
- 
