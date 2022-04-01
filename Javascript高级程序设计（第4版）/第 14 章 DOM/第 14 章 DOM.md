# 第 **14** 章 **DOM** 

- 本章内容

  - 理解文档对象模型（DOM）的构成 

  - 节点类型 

  - 浏览器兼容性 

  - MutationObserver接口 

- 文档对象模型（DOM，Document Object Model）

  是谁的接口？

  - HTML和XML文档的编程接口。

- DOM表示什么文档？

  - 由多层节点构成的

- 通过DOM可以做什么？

  - 添加、删除和修改页面的各个部分。

## **14.1** 节点层级 

- 任何HTML或XML文档都可以用DOM表示为一个什么结构？
  - 由节点构成的层级结构。

```
<html>
  <head>
    <title>Sample Page</title>
  </head>
  <body>
    <p>Hello World!</p>
  </body>
</html>

```

- 如果表示为层级结构，

![image-20220401220935096](第 14 章 DOM.assets/image-20220401220935096.png)

- document节点表示什么？
  - 每个文档的根节点。
- 根节点的唯一子节点是什么元素？
  - \<html>文档元素（documentElement）。
- 文档元素是文档哪一层的元素？
  - 最外层

- 所有其他元素都存在于什么元素之内？
  - 文档元素
- 每个文档可以有几个文档元素？
  - 只能有一个
- 在HTML页面中，文档元素始终是什么？
  - \<html>元素。
- 在XML文档中，文档元素可以是什么？
  - 任何元素

- HTML中的每段标记都可以表示为什么？
  - 一个节点。
- 元素节点表示什么？
  - HTML元素
- 属性节点表示什么？
  - 属性
- 文档类型节点表示什么？
  - 文档类型

- 注释节点表示什么？
  - 注释
- DOM中总共有多少种节点类型？
  - 12种
- 这些节点类型都继承哪种基本类型？
  - Node类型

### **14.1.1** **Node**类型

- Node接口在JavaScript中被实现为什么？
  - Node类型，
- 哪些浏览器可以直接访问Node类型？
  - 在除IE之外的浏览器可以
- 在JavaScript中，所有节点类型都继承什么类型？
  - Node
- 是否所有类型都共享相同的基本属性和方法？
  - 是 

- 每个节点都有什么属性？

  - nodeType

- nodeType属性表示什么？

  - 该节点的类型

- 节点类型由什么表示？

  - 12个数值常量

  - Node.ELEMENT_NODE（1） 

    Node.ATTRIBUTE_NODE（2） 

    Node.TEXT_NODE（3） 

    Node.CDATA_SECTION_NODE（4） 

    Node.ENTITY_REFERENCE_NODE（5） 

    Node.ENTITY_NODE（6） 

    Node.PROCESSING_INSTRUCTION_NODE（7） 

    Node.COMMENT_NODE（8） 

    Node.DOCUMENT_NODE（9） 

    Node.DOCUMENT_TYPE_NODE（10） 

    Node.DOCUMENT_FRAGMENT_NODE（11） 

    Node.NOTATION__NODE（12） 

- 如何确定节点类型？
  - 与这些常量比较

```
//someNode是一个元素节点。
if (someNode.nodeType == Node.ELEMENT_NODE) {
    alert("Node is an element.");
}

```

- 浏览器是否支持所有节点类型？
  - 否
- 开发者最常用到的是哪些类型？
  - 元素节点
  - 文本节点

#### \01. **nodeName**与**nodeValue** 

- nodeName与nodeValue保存着什么？
  - 有关节点的信息。
- 这两个属性的值完全取决于什么？
  - 节点类型
- 在使用这两个属性前，最好先做什么？
  - 检测节点类型

```
if (someNode.nodeType == 1) {
    value = someNode.nodeName; // 会显示元素的标签名
}
```

- 在这个例子中，先检查了什么？
  - 节点是不是元素
- 对元素而言，nodeName等于什么？
  - 元素的标签名
- 对元素而言，nodeValue等于什么？
  - null

#### \02. 节点关系 

- 节点关系可以形容为什么关系？
  - 家族关系，
  - 相当于把文档树比作家谱。
- 在HTML中，\<body>元素是\<html>元素的什么？
  - 子元素
- \<html>元素是\<body>元素的什么？
  - 父元素
- \<head>元素是\<body>元素的什么？
  - 同胞元素
  - 因为它们有共同的父元素\<html>。 

- 是否每个节点都有一个childNodes属性？
  - 是
- childNodes属性包含什么？
  - NodeList对象
- NodeList是一个什么？
  - 类数组对象，
- NodeList用于什么？
  - 存储可以按位置存取的有序节点。
- NodeList是不是Array的实例？
  - 不是
- NodeList是否可以使用中括号访问它的值？
  - 可以
- NodeList是否有length属性？
  - 有
- NodeList是一个对什么的查询？
  - DOM结构

- DOM结构的变化是否会在NodeList中反映出来？

  - 是

- NodeList是实时的活动对象

  还是是第一次访问时所获得内容的快照？

  - 实时的活动对象

- 如何访问NodeList中的元素？
  - 使用中括号
  - 使用item()方法

```
let firstChild = someNode.childNodes[0];
let secondChild = someNode.childNodes.item(1);
let count = someNode.childNodes.length;
```

- 多数开发者倾向于使用什么？
  - 中括号
  - 因为它是一个类数组对象。
- length属性表示什么？ 
  - 那一时刻NodeList中节点的数量。
- 如何把NodeList对象转换为数组？
  - 使用Array.prototype.slice()
  - ES6的Array.from()静态方法

```
let arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);
```

```
let arrayOfNodes = Array.from(someNode.childNodes);
```

- 是否每个节点都有一个parentNode属性？

  - 是

- parentNode指向什么？

  - 父元素

- childNodes中的所有节点是否都有同一个父元素？

  - 是

- childNodes列表中的每个节点

  都是同一列表中其他节点的什么？

  - 同胞节点

- 如何在childNodes列表的节点间导航？

  - previousSibling
  - nextSibling

- childNodes列表中

  第一个节点的previousSibling属性是什么？

  - null，

- childNodes列表中

  最后一个节点的nextSibling属性是什么？

  - null

```
if (someNode.nextSibling === null) {
    alert("Last node in the parent's childNodes list.");
} else if (someNode.previousSibling === null) {
    alert("First node in the parent's childNodes list.");
}
```

- 如果childNodes中只有一个节点，

  则它的previousSibling和nextSibling属性是什么？

  - 都是null。

- firstChild指向什么？
  - childNodes中第一个子节点
- lastChild指向什么？
  - childNodes中最后一个子节点
- someNode.firstChild的值等于什么？
  - someNode.childNodes[0]， 

- someNode.lastChild的值等于什么？ 
  - someNode.childNodes[someNode.childNodes.length-1]。

- 如果只有一个子节点，则firstChild和lastChild指向什么？
  - 同一个节点。
- 如果没有子节点，则firstChild和lastChild什么？
  - 都是null

![image-20220401224051528](第 14 章 DOM.assets/image-20220401224051528.png)

- hasChildNodes()返回true则说明什么？
  - 节点有一个或多个子节点。

- ownerDocument属性是什么？ 

  - 一个指向

    代表整个文档的

    文档节点的指针。

- 所有节点都被谁所拥有？

  - 创建它们的文档

- 一个节点是否可能同时存在于两个或者多个文档中？
  - 不可能
- ownerDocument属性为什么提供了便利？
  - 迅速访问文档节点
    - 因为无需在文档结构中逐层上溯了。 

- 是否所有节点都有子节点？
  - 否