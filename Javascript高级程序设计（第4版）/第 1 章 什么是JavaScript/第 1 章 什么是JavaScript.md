# 第 1 章 什么是 JavaScript

## 本章内容

- JavaScript 历史回顾
- JavaScript 是什么
- JavaScript 与 ECMAScript 的关系

- JavaScript 的不同版本

## 1.2 JavaScript 实现

- 虽然 JavaScript 和 ECMAScript 基本上是同义词

  但 JavaScript 远远不限于 ECMA-262 所定义的那样

- 完整的 JavaScript 实现包含以下几个部分

  - 核心（ECMAScript）
  - 文档对象模型（DOM）
  - 浏览器对象模型（BOM）

| JavaScript |      |      |
| :--------: | :--: | :--: |
| ECMAScript | DOM  | BOM  |

### 1.2.1 ECMAScript

- ECMAScript，即 ECMA-262 定义的语言

  并不局限于浏览器

- 事实上这门语言没有输入和输出之类的方法

- ECMA-262 将这门语言作为一个基准来定义

  以便在它之上再构建更稳健的脚本语言

- Web 浏览器只是 ECMAScript 实现可能存在的一种宿主环境

  - 宿主环境提供 ECMAScript 的基准实现和与环境自身交互必须的扩展

  - 扩展（比如 DOM）使用 ECMAScript 核心类型和语法

    提供特定于环境的额外功能

  - 其它宿主环境还有服务器端 JavaScript 平台 node.js 和即将淘汰的 Adobe Flash

- 如果不涉及浏览器的话，ECMA-262 到底定义了什么

  在基本的层面，它描述这门语言的如下部分：

  - 语法
  - 类型
  - 语句
  - 关键字
  - 保留字
  - 操作符
  - 全局对象

- ECMAScript 只是对实现这个规范描述的所有方面的一门语言的称呼

  JavaScript 实现了 ECMAScript

  Adobe ActionScript 同样也实现了 ECMAScript

#### 1. ECMAScipt 版本

- ECMAScript 不同的版本以”edition“表示

  （也就是描述特定实现的 ECMA-262 版本）

- ECMA-262 最近的版本是第 10 版

  发布于 2019 年 6 月

- ECMA-262 第 6 版，俗称 ES6、ES2015 或 ES Harmony（和谐版），于 2015 年 6 月发布

  这个版本包含了大概这个规范有史以来最重要的一批增强特性

  ES6正式支持了类、模块、迭代器、生成器、箭头函数、期约、反射、代理和众多新的数据类型

- ECMA-262 第 7 版，也称为 ES7 或 ES2016，于 2016 年 6 月发布

  这次修订只包含少量语法层面的增强

  如 Array.prototype.includes 和指数操作符

- ECMA-262 第 8 版，也称为 ES8、ES2017，完成于 2017 年 6 月

  这一版主要增加了异步函数（async / await）、SharedArrayBuffer 及 Atomics API

  以及 Object.values() / Object.entries() / Object.getOwnPropertyDesciptors() 

  和字符串填充方法

- ECMA-262 第 9 版，也称为 ES9、ES2018，发布于 2018 年 6 月

  这次修订包括异步迭代、剩余和扩展属性、一组新的正则表达式特性、Promise finally()

  以及模板字面量修订

- ECMA-262 第 10 版，也称为 ES10、ES2019，发布于 2019 年 6 月

  这次修订增加了 Array.prototype.flat() / faltMap()、String.prototype.trimStart() / trimEnd()

  Object.formEntries() 方法以及 Symbol.prototype.description 属性

  明确定义了 Function.prototype.toString() 的返回值

  并固定了 Array.prototype.sort() 的顺序

  另外，这次修订解决了与 JSON 字符串兼容的问题，

  并定义了 catch 子句的可选绑定

#### 2. ECMAScript 符合性是什么

- ECMAScript-262 阐述了什么是 ECMAScript 符合性

- 要成为 ECMAScript 实现，必须满足下列条件：
  - 支持 ECMA-262 中描述的所有 ”类型、值、对象、属性、函数，以及程序语法与语义“
  - 支持 Unicode 字符标准

- 此外，符合性实现还可以满足下列要求

  - 增加 ECMA-262 中未提及的”额外的类型、值、对象、属性和函数“

    ECMA-262 所说的这些额外内容主要指

    规范中未给出的新对象或对象的新属性

  - 支持 ECMA-262 中没有定义的”程序和正则表达式语法“

    （意思是允许修改和扩展内置的正则表达式特性）

- 以上条件为实现开发者基于 ECMAScript 开发语言提供了极大的权限和灵活度

  也是其广受欢迎的原因之一

#### 3. 浏览器对 ECMAScript 的支持