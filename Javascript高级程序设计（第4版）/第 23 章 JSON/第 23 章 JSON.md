# 第 **23** 章 **JSON**

- 本章内容

  - 理解JSON语法 

  - 解析JSON 

  - JSON序列化 

- 理解JSON最关键的一点是要把它当成一种什么？
  - 数据格式
    - 而不是编程语言。
- JSON是否属于JavaScript？
  - 不属于
    - 它们只是拥有相同的语法而已
- JSON是否只能在JavaScript中使用？
  - 不是
    - 它是一种通用数据格式
    - 很多语言都有解析和序列化JSON的内置能力

## **23.1** 语法

- JSON语法支持表示哪3种类型的值？ 

  - 简单值：
    - 字符串、数值、布尔值、null
    - 特殊值undefined不可以。 

  - 对象：
    - 每个值可以是简单值，
    - 也可以是复杂类型。 

  - 数组：
    - 数组的值可以是任意类型，
      - 包括简单值、对象，其他数组。 

- JSON是否有变量、函数或对象实例的概念？
  - 没有
- JSON的所有记号都只为表示什么？
  - 结构化数据

### **23.1.1** 简单值 

- 最简单的JSON是否可以是一个数值？
  - 可以

```
5
```

```
"Hello world!"
```

- JavaScript字符串与JSON字符串的主要区别是什么？
  - JSON字符串必须使用双引号
    - （单引号会导致语法错误）。 
- 布尔值和null本身是否是有效的JSON值？
  - 是

### **23.1.2** 对象 

- 以下是JavaScript中的对象字面量：

```
let person = { 
	name: "Nicholas", 
	age: 29
};
```

- JSON中的对象必须使用什么符号把属性名包围起来？
  - 双引号
- 下面的代码与前面的代码是否是一样的？
  - 是

```
let object = { 
	"name": "Nicholas",
    "age" : 29
};
```

- 而用JSON表示相同的对象的语法是什么？

```
{ 
	"name": "Nicholas", 
	"age": 29 
}
```

- 与JavaScript对象字面量相比，JSON主要有哪两处不同？
  - 没有变量声明
    - （JSON中没有变量）
  - 最后没有分号
    - （不需要，因为不是JavaScript语句）。
- JSON对象字面量属性的值可以是什么值？
  - 简单值
  - 复杂数据类型
- 复杂数据类型是否可以在对象中再嵌入对象？
  - 可以

```
{ 
	"name": "Nicholas", 
	"age": 29, 
	"school": { 
		"name": "Merrimack College", 
		"location": "North Andover, MA" 
	}
}
```

- 为什么整个JSON对象中有两个属性都叫"name"是允许的？
  - 因为它们属于两个不同的对象
- 同一个对象中是否不允许出现两个相同的属性？
  - 不允许 

### **23.1.3** 数组

- JSON的第二种复杂数据类型是什么？
  - 数组
- 数组在JSON中使用JavaScript的什么形式表示？
  - 数组字面量
- 一个JavaScript数组： 

```
let values = [25, "hi", true];
```

- 在JSON中可以使用类似语法表示相同的数组： 

```
[25, "hi", true]
```

- JSON数组比起JS数组没有什么？
  - 没有变量
  - 没有分号。

- 数组和对象是否可以组合使用？
  - 可以

```
[
  {
    "title": "Professional JavaScript",
    "authors": [
      "Nicholas C. Zakas",
      "Matt Frisbie"
    ],
    "edition": 4,
    "year": 2017
  },
  {
    "title": "Professional JavaScript",
    "authors": [
      "Nicholas C. Zakas"
    ],
    "edition": 3,
    "year": 2011
  },
  {
    "title": "Professional JavaScript",
    "authors": [
      "Nicholas C. Zakas"
    ],
    "edition": 2,
    "year": 2009
  },
  {
    "title": "Professional Ajax",
    "authors": [
      "Nicholas C. Zakas",
      "Jeremy McPeak",
      "Joe Fawcett"
    ],
    "edition": 2,
    "year": 2008
  },
  {
    "title": "Professional Ajax",
    "authors": [
      "Nicholas C. Zakas",
      "Jeremy McPeak",
      "Joe Fawcett"
    ],
    "edition": 1,
    "year": 2007
  },
  {
    "title": "Professional JavaScript",
    "authors": [
      "Nicholas C. Zakas"
    ],
    "edition": 1,
    "year": 2006
  }
]

```

## **23.2** 解析与序列化

- 前面例子中的JSON包含很多图书，如何获取第三本书的书名？

```
books[2].title
```

### **23.2.1 JSON**对象

- eval()是否可以解析、解释JSON ，

  并将其作为JavaScript对象和数组返回？

  - 可以
    - 因为JSON是JavaScript语法的子集

- JSON全局对象是否在所有主流浏览器中都得到了支持？

  - 是

- 旧版本的浏览器可以使用JSON的什么脚本？

  - 垫片脚本

- 这个JSON垫片脚本最好只在什么时侯使用？

  - 浏览器原生不支持JSON解析的时候

- JSON对象有哪两个方法？
  - stringify()
    - 将JavaScript序列化为JSON字符串，
  - parse()。
    - 将JSON解析为原生JavaScript值

```
let book = {
    title: "Professional JavaScript",
    authors: ["Nicholas C. Zakas",
        "Matt Frisbie"
    ],
    edition: 4,
    year: 2017
};
let jsonText = JSON.stringify(book);
```

- 默认情况下，JSON.stringify()会输出什么样的JSON字符串？
  - 不包含空格或缩进的

```
{"title":"Professional JavaScript","authors":["Nicholas C. Zakas","Matt Frisbie"], "edition":4,"year":2017}
```

- 在序列化JavaScript对象时，

  所有函数和原型成员都会被怎么处理？

  - 在结果中省略

- 值为undefined的任何属性会被怎么处理？
  - 会被跳过
- 最终得到的就是所有实例属性均为什么？
  - 有效JSON数据类型的表示。 

- JSON字符串可以直接传给什么方法，

  然后得到相应的JavaScript值？

  - JSON.parse()

```
let bookCopy = JSON.parse(jsonText);
```

- 如果给JSON.parse()传入的JSON字符串无效，则会发生什么？
  - 导致抛出错误

### **23.2.2** 序列化选项 

- JSON.stringify()方法除了要序列化的对象，

  还可以接收两个参数，用于什么？

  - 指定其他序列化JavaScript对象的方式。

- 第一个参数是什么？
  - 过滤器，可以是数组或函数
- 第二个参数是什么？
  - 用于缩进结果 

#### \01. 过滤结果

- 如果第二个参数是一个数组，

  那么JSON.stringify()返回的结果是什么？

  - 只会包含该数组中列出的对象属性。

```
let book = {
    title: "Professional JavaScript",
    authors: [
        "Nicholas C. Zakas", "Matt Frisbie"
    ],
    edition: 4,
    year: 2017
};
let jsonText = JSON.stringify(book, ["title", "edition"]);
```

- 结果JSON字符串：

```
{"title":"Professional JavaScript","edition":4}
```

- 如果第二个参数是一个函数，接收哪两个参数？
  - 属性名（key）
  - 属性值（value）。
- 可以根据这个key决定什么？
  - 要对相应属性执行什么操作
- 这个key始终是什么数据类型？
  - 字符串，
    - 只是在值不属于某个键/值对时会是空字符串。 

- 为了改变对象的序列化，返回的值就是什么？
  - 相应key应该包含的结果。 

- 注意，返回undefined会导致属性被怎么处理？
  - 被忽略。

```
let book = {
    title: "Professional JavaScript",
    authors: [
        "Nicholas C. Zakas",
        "Matt Frisbie"
    ],
    edition: 4,
    year: 2017
};
let jsonText = JSON.stringify(book, (key, value) => {
    switch (key) {
        case "authors":
            return value.join(",") case "year": return 5000;
        case "edition":
            return undefined;
        default:
            return value;
    }
});
```

- 最后一定要提供什么，以便返回其他属性传入的值？
  - 默认返回值
- 最终得到的JSON字符串：

```
{
    "title": "Professional JavaScript",
    "authors": "Nicholas C. Zakas,Matt Frisbie",
    "year": 5000
}
```

- 函数过滤器会应用到什么对象？

  - 要序列化的对象

    所包含的所有对象，

- 如果数组中包含多个具有这些属性的对象，

  则序列化之后会是怎样的？

  - 每个对象都只会剩下上面这些属性

#### \02. 字符串缩进

- JSON.stringify()方法的第三个参数控制什么？
  - 缩进和空格。
- 在这个参数是数值时，表示什么？
  - 每一级缩进的空格数。

```
let book = {
    title: "Professional JavaScript",
    authors: ["Nicholas C. Zakas", "Matt Frisbie"],
    edition: 4,
    year: 2017
};
let jsonText = JSON.stringify(book, null, 4);
```

- 得到的jsonText格式：

```
{
    "title": "Professional JavaScript",
    "authors": ["Nicholas C. Zakas", "Matt Frisbie"],
    "edition": 4,
    "year": 2017
}
```

- 最大缩进值为什么？
  - 10
  - 大于10的值会自动设置为10。 

- 如果缩进参数是一个字符串而非数值，那么JSON字符串会怎么缩进？
  - 使用字符串来缩进，
- 是否可以将缩进字符设置为Tab或任意字符，如两个连字符： 

```
let jsonText = JSON.stringify(book, null, "--" );
```

- jsonText的值会变成如下格式：

```
{--"title": "Professional JavaScript",
--"authors": [ 
----"Nicholas C. Zakas", 
----"Matt Frisbie" 
--], 
--"edition": 4, 
--"year": 2017 }
```

- 使用字符串时有多少个字符的长度限制。
  - 10
  - 如果字符串长度超过10，则会在第10个字符处截断。

#### \03. **toJSON()**方法 

- 如何在JSON.stringify()之上自定义JSON序列化？

  - 可以在要序列化的对象中添加toJSON()方法，

- 自定义JSON序列化时会执行什么操作？

  - 基于这个方法返回适当的JSON表示

- 原生Date对象就有一个toJSON()方法，能够做什么？

  - 自动将JavaScript的Date对象转换为

    ISO 8601日期字符串

    （本质上与在Date对象上调用toISOString()方法一样）。 

```
let book = {
    title: "Professional JavaScript",
    authors: ["Nicholas C. Zakas", "Matt Frisbie"],
    edition: 4,
    year: 2017,
    toJSON: function () {
        return this.title;
    }
};
let jsonText = JSON.stringify(book);
```

- toJSON()方法可以返回什么值？
  - 任意序列化值
- 如果对象被嵌入在另一个对象中，返回undefined会导致什么？ 
  - 导致值变成null；

- 如果是顶级对象，则本身就是什么值？
  - undefined 

- 箭头函数是否能用来定义toJSON()方法？为什么？

  - 不能

  - 主要原因是箭头函数的词法作用域是全局作用域，

    在这种情况下不合适。 

- toJSON()方法是否可以与过滤函数一起使用？

  - 可以

- 在把对象传给JSON.stringify()时会执行哪些步骤？

  - (1) 如果可以获取实际的值，

    - 则调用toJSON()方法获取实际的值， 

    - 否则使用默认的序列化。 

  - (2) 如果提供了第二个参数，

    - 则应用过滤。
    - 传入过滤函数的值就是第(1)步返回的值。 

  - (3) 第(2)步返回的每个值都会相应地进行序列化。 

  - (4) 如果提供了第三个参数，
    - 则相应地进行缩进。 

### **23.2.3** 解析选项

- JSON.parse()方法也可以接收一个额外的函数参数，

  这个函数会怎么执行操作？

  - 针对每个键/ 值对都调用一次。

- 这个函数被称为什么函数？
  - 还原函数
- 还原函数接收哪两个参数？
  - 属性名
  - 属性值 
- 还原函数是否需要返回值？
  - 需要
- 如果还原函数返回undefined，则结果中就会执行什么操作？
  - 删除相应的键
- 如果返回了其他任何值，则会执行什么操作？
  - 该值就会成为相应键的值插入到结果中
- 还原函数经常被用于把日期字符串转换为什么？
  - Date对象。

```
let book = {
    title: "Professional JavaScript",
    authors: ["Nicholas C. Zakas", "Matt Frisbie"],
    edition: 4,
    year: 2017,
    releaseDate: new Date(2017, 11, 1)
};
let jsonText = JSON.stringify(book);
let bookCopy = JSON.parse(jsonText, (key, value) => key == "releaseDate" ? new Date(value) : value);
alert(bookCopy.releaseDate.getFullYear());
```

## **23.3** 小结

- JSON是一种什么？
  - 轻量级数据格式
- 这个格式使用JavaScript语法的一个子集表示对象、数组、字符串、数值、布尔值和null。
- 虽然XML也能胜任同样的角色，但JSON的优势？
  - 更简洁，
  - JavaScript支持也更好。
  - 更重要的是，所有浏览器都已经原生支持全局JSON对象。 

- ECMAScript 5定义了原生JSON对象，用于什么？
  - JSON.stringify()
    - 将JavaScript对象序列化为JSON字符串，
  - JSON.parse()
    - 以及将JSON数组解析为JavaScript对象 
- 这两个方法都有一些选项可以用来做什么？
  - 改变默认的行为，以实现过滤或修改流程