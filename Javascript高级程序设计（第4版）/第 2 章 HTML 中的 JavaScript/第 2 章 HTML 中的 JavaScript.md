# 第 2 章 HTML 中的 JavaScript

## 本章内容

- 使用<script>元素
- 行内脚本和外部脚本的比较
- 文档模式对 JavaScript 有什么影响
- 确保 JavaScript 不可用时的用户体验

## 2.1 \<script>元素

- \<script>元素是用来做什么的

  - 将 JavaScript 插入 HTML

- \<script>元素有哪些属性，每个属性用来做什么

  - async：可选
    - 用来表示立即开始下载脚本，但不能阻止其它页面动作
    - 只对外部文件有效

  - charset：可选

    - 用来指定代码字符集
    - 这个属性很少使用，因为大多数浏览器不在乎它的值

  - crossorigin：可选

    - 用来配置相关请求的 CORS（跨域资源共享）设置
    - 默认不使用 CORS
    - crossorigin="anonymous" 不用设置凭据标志
    - crossorigin="use-credentials" 要设置凭据标志

  - defer：可选

    - 用来表示脚本可以延迟到文档完全被解析和显示后再执行
    - 只对外部脚本文件有效

  - integrity：可选

    - 用来允许比对

      接收到的资源和integrity指定的签名，

      以验证子资源的完整性

    - 如果接收到的资源的签名与integrity指定的签名不匹配，

      则页面会报错，

      脚本不执行

    - integrity属性可以确保

      内容分发网络CDN不会提供恶意内容

      （CDN是一种网络内容服务体系，提供内容的分发和服务。）

  - language：废弃
    - 用来表示代码块中的脚本语言（JavaScript，JavaScript 1.2，VBScript）
    - 因为大多数浏览器会忽略language属性，所以不应该再使用

  - src：可选

    - 用来表示要执行的代码的外部文件

  - type：可选

    - 代替 language

    - 用来表示代码块中脚本语言的内容类型

    - 如果 type 的值是 module，则代码会被当成 ES6 模块

      只有此时

      代码中才能出现 import 和 export 关键字

- 使用\<script>的方式有哪几种？
  - 通过\<script>嵌入行内代码
  - 通过\<script>包含外部JavaScript文件

- 如何嵌入行内代码？

  - 把代码放在\<script>元素中

    ```
    <script>
    	function sayHi() {
    		console.log("Hi!")
    	}
    </script>
    ```

  - 在\<script>中的代码被解释完成前，页面会阻塞

    （页面的其余内容不会被加载，也不会被显示）

  - 代码中不能出现字符串“\</script>”

    - 下面的代码会导致浏览器报错

    ```
    <script>
    	function sayScript() {
    		console.log("</script>")
    	}
    </script>
    ```

    - 怎么在\<script>中使用字符串“\</script>”

      - 用转义字符”\“

        ```
        <script>
         function sayScript() {
         	console.log("\</script>")
         }
        </script>
        ```

- 如何包含外部JavaScript文件？

  - 使用 src 属性

    ```
    <script src="example.js"></script>
    ```

  - 在外部 JavaScript文件解释完成前，页面也会阻塞

    （页面的其余内容不会被加载，也不会被显示）

  - 在 XHTML 文档中，可以忽略结束标签

    - ```
      <script src="example.js" />
      ```

    - 以上语法不能用在 HTML 文档中，

      因为它是无效的，有些浏览器不能正常处理

  - 使用了 src 属性的\<script>元素

    不能包含其它 JS 代码

    - 如果两者都提供，

      浏览器只会下载并执行外部 JS 文件，

      忽略行内代码

  - \<script>可以包含来自外部域的 JS 文件

    - ```
      <script src="http://www.somewhere.com/afile.js"></script>
      ```

    - 浏览器在解析这个外部 JS 资源时，

      会向 src 属性指定的路径发送一个 GET 请求

      GET 请求不受浏览器同源策略的限制

      但返回并被执行的 JS 文件受限制

      GET 请求仍然受父页面 HTTP/HTTPS 协议的限制

    - 确保该域是自己所有的

      或者该域是一个可信的来源

      - \<script>标签的 integrity 属性用来防范恶意内容

        但这个属性不是所有浏览器都支持

- 浏览器会按照\<script>在页面中出现顺序依次解释

  前提是没有使用 defer 和 async 属性

  第二个\<script>元素的代码必须在

  第一个\<script>元素的代码解释完毕才能解释

### 2.1.1 标签位置

- 过去，\<script>都被放在\<head>内

  ```
  <!DOCTYPE html>
  <html>
  	<head>
  		<title>Example HTML Page</title>
  		<script src="example1.js"></script>
  		<script src="example2.js"></script>
  	</head>
  	<body>
  		<!-- 这里是页面内容 -->
  	</body>
  </html>
  ```

  - 这么做的目的是把外部的 CSS 和 JS 文件都集中到一起

  - 所有 JS 代码都下载、解析、解释完毕后

    才开始渲染页面

    （浏览器解析到\<body>时开始渲染）

    - 对于需要很多 JS 的页面，

      页面渲染明显延迟

      浏览器窗口完全空白时间过长

- 为防止浏览器窗口完全空白时间过长

  把所有的 JS 引用放在\<body>中的结尾

  ```
  <!DOCTYPE html>
  <html>
    <head>
      <title>Example HTML Page</title>
    </head>
    <body>
      <!-- 这里是页面内容 -->
      <script src="example1.js"></script>
      <script src="example2.js"></script>
    </body>
  </html>
  ```

  - 这样一来

    页面会在处理 JS 代码之前

    完全渲染页面

    感觉页面加载更快了

    因为浏览器空白页面的时间短了

### 2.1.2 推迟执行脚本

- 怎么推迟执行脚本

  - 添加 defer 属性

  - defer 属性表示立即下载，但延迟执行

    ```
    <!DOCTYPE html>
    <html>
      <head>
        <title>Example HTML Page</title>
        <script defer src="example1.js"></script>
        <script defer src="example2.js"></script>
      </head>
      <body>
        <!-- 这里是页面内容 -->
      </body>
    </html>
    ```

  - 例子中\<script>会在浏览器解析到\</html>后才会执行

  - HTML5 规范要求

    脚本按照出现顺序执行

    example1.js 在 expamle2.js 之前执行

    两者都在 DOMContentLoaded 事件之前执行

    - 但在实际当中

      推迟执行的脚本不一定按顺序执行

      因此最好只有一个推迟执行的脚本

- HTML5 中规定，defer 属性只对外部文件有效

  支持 HTML5 的浏览器

  会忽略行内脚本的 defer 属性

- 注意，对于 XHTML 文档，应写成 defer="defer"

### 2.1.3 异步执行的脚本

- 怎么使脚本异步执行？

  - 添加 async 属性

- async 和 defer 的共同点？

  - 都只适用于外部脚本
  - 都会立即下载

  ```
  <!DOCTYPE html>
  <html>
    <head>
      <title>Example HTML Page</title>
    </head>
    <body>
      <!-- 这里是页面内容 -->
      <script async src="example1.js"></script>
      <script async src="example2.js"></script>
    </body>
  </html>
  ```

- 例子中，example2 可能先于 example1 执行

- 添加 async 属性的脚本（异步脚本）

  不必等该脚本下载和执行完后再加载页面

  不必等该脚本下载和执行完后再加载其它脚本

  - 因此，异步脚本不能在加载期间修改 DOM
    - 不能使用 document.write

- 异步脚本保证在页面的 load 事件前执行

  但可能会在 DOMContentLoad 之前或之后执行

- 注意：对于 XHTML 文档，应该写成 async="async"

### 2.1.4 动态加载脚本

- 如何动态加载脚本？

  - 创建一个 script 元素

    并将 script 元素添加到 DOM 

  ```
  const script = document.createElement("script");
  script.src = "gibberish.js";
  document.head.appendChild(script);
  ```

- 动态加载的脚本，

  默认情况下是添加了 async 属性

  - 但不是所有浏览器都支持 async 属性

    所以要统一行为

    明确设置为同步加载

    ```
    const script = document.createElement("script");
    script.src = "gibberish.js";
    script.async = "false";
    document.head.appendChild(script);
    ```

- 动态加载的脚本

  对浏览器预加载器是不可见的（这影响性能）

  - 怎么让预加载器知道动态加载脚本的存在？

    - 可以在文档头部显示声明

    ```
    <link rel="preload" href="gibberish.js" />
    ```

### 2.1.5 XHTML 中的变化

- XHTML 是什么

  - 可拓展超文本标记语言XHTML是

    将 HTML 作为 XML 的应用重新包装的结果

    （Extensible HyperText Matkup Language）

- XHTML 与 HTML 的不同点是什么

  - 在 XHTML 中使用 JavaScript 

    必须有 type 属性

    并且 type 属性的值为 text/javascript

  - 在 HTML 中可以没有这个属性

- XHTML 已经退出历史舞台

## 2.2 行内代码与外部文件

- 为什么推荐使用外部文件？

  - 可维护性

    - 用一个目录保存所有 JS文件，更容易维护

  - 缓存

    - 浏览器会缓存所有外部链接的 JS文件

    - 如果两个页面用到同一个文件，

      则该文件只需下载一次

  - 适应未来

    - 外部 JS 文件的语法在 HTML 和 XHTML 中是一样

- 以什么形式向客户端送达脚本更具优势？

  - 以轻量、独立 JS 组件形式

  - 因为在 SPDY/HTTP2 中，预请求的消耗降低

    - 通过 SPDY/HTTP2 获取所有独立的 JS 组件

      与获取一个大 JS 文件的延迟差不多

  - 第一个页面

    ```
    <script src="mainA.js"></script>
    <script src="component1.js"></script>
    <script src="component2.js"></script>
    <script src="component3.js"></script>
    ```

  - 后续页面

    ```
    <script src="mainB.js"></script>
    <script src="component3.js"></script>
    <script src="component4.js"></script>
    <script src="component5.js"></script>
    ```

  - 在第一个页面请求时，

    浏览器取得一批 JS 文件，

    并将 JS 文件放在浏览器缓存中

  - 在第二个页面请求时，

    该页面依赖的某些 JS 组件已经在浏览器缓存中

## 2.3 文档模式

- 如何切换文档模式？
  - 使用 doctype
- 文档模式有哪几种？
  - 混杂模式
  - 标准模式
  - 准标准模式
- 混杂模式和标准模式的主要区别是什么？
  -  CSS 渲染的内容

- 准标准模式和标准模式的主要区别是什么？

  - 如何对待图片元素周围的空白

    （在表格中使用图片时最明显）

- 如何开启混杂模式？
  - 省略文档开头的 doctype

- 混杂模式的缺点？

  - 不同浏览器的差异大

- 如何开启标准模式？

  - ```
    <!-- HTML5 -->
    <!DOCTYPE html>
    ```

- 如何开启准标准模式？

  - 通过过渡性文档类型（Transitional）和框架集文档类型（Frameset）来触发

- 准标准模式和标准模式非常接近，很少需要区分

  本书所说的标准模式

  就是除混杂模式以外的模式

## 2.4 \<noscript>元素

- 什么情况下浏览器会显示\<noscript>中的内容？

  - 浏览器不支持脚本

  - 浏览器对脚本的支持被关闭

    - 上述任何一个条件满足

      浏览器会渲染\<noscript>的内容

      否则不会渲染

## 2.5 小结

- 如何包含外部 JS 文件？
  - 设置 src 属性为要包含文件的 URL
  - 文件可以和网页在同一个域，也可以在不同域

- \<script>元素的执行次序是怎样的？

  - 在不使用 defer 和 async 属性的前提下

    \<script>元素会按出现顺序解释

    \<script>中的代码按次序解释

- \<script>元素应该放在哪里？

  - 放到介于主内容之后及\</body>之前

  - 因为对于不推迟执行的脚本

    浏览器必须解释完脚本代码

    才能继续渲染页面的剩余部分

- 如何让脚本推迟到文档渲染完毕再执行？
  - 使用 defer 属性
  - 推迟的脚本按照出现顺序执行

- 如何让脚本异步加载？

  - 使用 async 属性

  - 异步脚本的特点？

    - 异步脚本不用等其它脚本，

      也不阻塞文档渲染

    - 异步脚本不一定按出现顺序执行

- \<noscript>元素是用来做什么的？

  - 用来指定在浏览器不支持脚本时显示的内容

  - 如果浏览器支持脚本，

    \<noscript>元素中的内容不会被渲染