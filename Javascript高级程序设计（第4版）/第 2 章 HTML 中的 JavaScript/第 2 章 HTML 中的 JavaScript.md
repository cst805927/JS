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

    - 用来允许比对接收到的资源和integrity指定的签名，以验证子资源的完整性

    - 如果接收到的资源的签名与integrity指定的签名不匹配，则页面会报错，脚本不执行

    - 这个属性可以确保内容分发网络CDN不会提供恶意内容

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

      只有此时代码中才能出现 import 和 export 关键字

- 使用\<script>的方式有哪几种
  - 通过\<script>嵌入JavaScript代码
  - 通过\<script>包含外部JavaScript文件

