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

