# 第 **12** 章 **BOM** 

- 本章内容

  - 理解BOM的核心——window对象 

  - 控制窗口及弹窗 

  - 通过location对象获取页面信息 

  - 使用navigator对象了解浏览器 

  - 通过history对象操作浏览器历史 

## **12.1 window**对象

- BOM的核心是什么对象？

  - window

- window对象表示什么的实例？

  - 浏览器的实例

- window对象在浏览器中有哪两重身份？

  - ECMAScript中的Global对象
  - 浏览器窗口的JavaScript接口

- 网页中定义的所有对象、变量和函数

  都以window作为什么？

  - Global对象

- 可以访问Global对象上定义的什么？

  - parseInt()等全局方法

- 因为window对象的属性在什么作用域中有效？

  - 全局作用域

- 很多浏览器API及相关构造函数

  都以什么形式暴露出来？

  - window对象属性

- 某些window对象的属性在不同浏览器间是否一样？
  - 不一定
    - 可能差异很大

### **12.1.1** **Global**作用域 

- 为什么通过var声明的所有全局变量和函数

  都会变成window对象的属性和方法？

  - window对象被复用为ECMAScript的Global对象

```
var age = 29;
var sayAge = () => alert(this.age);

alert(window.age);// 29 
sayAge();// 29 
window.sayAge(); // 29

```

- 如果在这里使用let或const替代var，

  则是否会把变量添加给全局对象？

  - 不会

```
let age = 29;

const sayAge = () => alert(this.age);

alert(window.age); // undefined

sayAge(); // undefined 

window.sayAge(); 
// TypeError: window.sayAge is not a function

```

- 访问未声明的变量会发生什么？
  - 抛出错误，
- 可以在window对象上查询什么？
  - 是否存在可能未声明的变量

```
// 这会导致抛出错误，因为oldValue没有声明 
var newValue = oldValue;

 // 这不会抛出错误，因为这里是属性查询
// newValue会被设置为undefined 
var newValue = window.oldValue;

```

- location和navigator对象都暴露在什么作用域中？
  - 全局作用域
    - 因而它们也是window对象的属性。 

### **12.1.2** 窗口关系

- top对象始终指向什么窗口？
  - 最上层（最外层）窗口
  - 即浏览器窗口本身

- parent对象则始终指向什么窗口？

  - 当前窗口的父窗口

- 如果当前窗口是最上层窗口，则parent等于什么？

  - top
    - （都等于window）

- 最上层的window如果不是通过window.open()打开的，

  那么其name属性是否会包含值？

  - 不会

- self对象始终会指向什么？
  - window
- self和window是否是同一个对象？
  - 是
- 为什么要暴露self？
  - 为了和top、parent保持一致。 

- 这些属性是否是window对象的属性？

  - 是

- 是否可以访问

  window.parent、window.top、window.self？

  - 可以

- 是否可以把访问多个窗口的window对象串联起来？
  - 可以
    - 比如window.parent.parent

### **12.1.3** 窗口位置与像素比 

- screenLeft和screenTop属性，用于表示什么？
  - 窗口相对于屏幕左侧和顶部的位置 ，
  - 返回值的单位是CSS像素。 

- 如何移动窗口？
  - 使用moveTo()和moveBy()方法
- moveTo()接收什么参数？
  - 要移动到的新位置的绝对坐标
- moveBy()接收什么参数？
  - 相对当前位置在两个方向上移动的像素数

```
// 把窗口移动到左上角 
window.moveTo(0, 0);

// 把窗口向下移动100像素 
window.moveBy(0, 100);

// 把窗口移动到坐标位置(200, 300) 
window.moveTo(200, 300);

// 把窗口向左移动50像素 
window.moveBy(-50, 0);

```

- 依浏览器而定，以上方法可能会被部分或全部禁用

#### 像素比 

- Web开发中使用的统一像素单位是什么？

  - CSS像素

- CSS像素单位的背后其实是什么？

  - 一个角度：0.0213°。

- 为什么要这样定义像素大小？

  - 为了在不同设备上统一标准。

- 低分辨率平板设备上12像素（CSS像素）的文字

  是否应该与 

  高清4K屏幕下12像素（CSS像素）的文字

  具有相同大小？

  - 是

- 这就带来了什么问题？

  - 不同像素密度的屏幕下

    就会有不同的缩放系数，

- 缩放系数的目的是什么？

  - 以便把物理像素转换为CSS像素

- 这个物理像素与CSS像素之间的转换比率

  由哪个属性提供？

  - window.devicePixelRatio属性。

- 对于分辨率从1920×1080转换为640×320的设备，window.devicePixelRatio的值是多少？

  - 3

- 12CSS像素的文字实际上

  就会用多少像素的物理像素来显示？

  - 36像素

- window.devicePixelRatio实际上与什么对应？
  - 每英寸像素数DPI 
- DPI表示什么？
  - 单位像素密度，
- window.devicePixelRatio表示什么？
  - 物理像素与逻辑像素之间的缩放系数。

### **12.1.4** 窗口大小 

- outerWidth和outerHeight返回什么？
  - 浏览器窗口自身的大小 

- innerWidth和innerHeight返回什么？

  - 浏览器窗口中页面视口的大小

    （不包含浏览器边框和工具栏）

- document.documentElement.clientWidth和 

  document.documentElement.clientHeight返回什么？

  - 页面视口的宽度和高度。 

- 如何确定页面视口的大小？

```
let pageWidth = window.innerWidth,

	pageHeight = window.innerHeight;
	
if (typeof pageWidth != "number") {

	if (document.compatMode == "CSS1Compat") {
	
		pageWidth = document.documentElement.clientWidth;
		
		pageHeight = document.documentElement.clientHeight;
		
	} else {
	
		pageWidth = document.body.clientWidth;
		
		pageHeight = document.body.clientHeight;
	}
}

```

- 通过document.compatMode来检查什么？
  - 页面是否处于标准模式。

- 在移动设备上，什么属性返回视口的大小？

  - window.innerWidth
  - window.innerHeight
  - 即屏幕上页面可视区域的大小。

- 在什么中提供了相同的信息？

  - document.documentElement.clientWidth
  - document.documentElement.clientHeight

  - 在放大或缩小页面时，这些值也会相应变化。 

- 在其他移动浏览器中，document.documentElement.clientWidth和 

  document.documentElement.clientHeight返回什么？

  - 布局视口的大小
    - 即渲染页面的实际大小。

- 布局视口是相对于什么的概念？

  - 可见视口

- 可见视口是什么？

  - 只能显示整个页面的一小部分。

- Mobile Internet Explorer把布局视口的信息保存在哪里？

  - document.body.clientWidth
  - document.body.clientHeight
  - 在放大或缩小页面时，这些值也会相应变化。

- 因为桌面浏览器的差异，所以需要做什么？
  - 先确定用户是不是在使用移动设备，
  - 然后再决定使用哪个属性。

- 可以使用什么方法调整窗口大小？
  - resizeTo()
  - resizeBy()
- resizeTo()接收什么参数？
  - 新的宽度和高度值
- resizeBy()接收什么参数？
  - 宽度和高度各要缩放多少。

```
// 缩放到100×100 
window.resizeTo(100, 100);

// 缩放到200×150 
window.resizeBy(100, 50);

// 缩放到300×300 
window.resizeTo(300, 300);

```

- 缩放窗口的方法可能会被浏览器禁用，而且在 

  某些浏览器中默认是禁用的。同样，

- 缩放窗口的方法只能应用到哪一层的window对象？
  - 最上层 

### **12.1.5** 视口位置 

- 用户可以通过做什么在有限的视口中查看文档？
  - 滚动
- 度量文档相对于视口滚动距离的属性有什么？
  - 两对属性，返回相等的值：
  - window.pageXoffset/window.scrollX
  - window.pageYoffset/window.scrollY。

- 可以使用什么方法滚动页面？
  - scroll()
  - scrollTo()
  - scrollBy()

```
// 相对于当前视口向下滚动100像素 
window.scrollBy(0, 100);

// 相对于当前视口向右滚动40像素 
window.scrollBy(40, 0);

// 滚动到页面左上角 
window.scrollTo(0, 0);

// 滚动到距离屏幕左边及顶边各100像素的位置 
window.scrollTo(100, 100);
```

- 这几个方法也都接收一个什么？

  - ScrollToOptions字典，

- 除了提供偏移值，

  还可以通过什么属性告诉浏览器是否平滑滚动？

  - behavior属性

```
// 正常滚动
window.scrollTo({
	left: 100,
	top: 100,
	behavior: "auto",
});

// 平滑滚动
window.scrollTo({
	left: 100,
	top: 100,
	behavior: "smooth",
});

```

### **12.1.6** 导航与打开新窗口

- window.open()方法可以用于什么？

  - 导航到指定URL
  - 打开新浏览器窗口。

- 这个方法接收哪4个参数？

  - 要加载的URL

  - 目标窗口

  - 特性字符串

  - 表示新窗口在浏览器历史记录中

    是否替代当前加载页面的布尔值。 

- 通常调用这个方法时只传哪些参数？
  - 前3个
- 最后一个参数只有在什么时候才会使用？
  - 不打开新窗口时 

- 如果window.open()的第二个参数

  是一个已经存在的窗口或窗格frame的名字，

  则会执行什么操作？

  - 在对应的窗口或窗格中打开URL

```
// 与<a href="http://www.wrox.com" target="topFrame"/>相同
window.open("http://www.wrox.com/", "topFrame");

```

- 如同用户点击了一个

  href属性为"http://www.wrox.com"，

  target属性为"topFrame"的链接。

- 如果有一个窗口名叫"topFrame"，

  则会执行什么操作？

  - 这个窗口就会打开这个URL；

- 否则就会执行什么操作？
  - 打开一个新窗口
  - 并将其命名为"topFrame"。
- 第二个参数是否可以是一个特殊的窗口名？
  - 可以
  - 比如\_self、\_parent、\_top、\_blank。

#### \01. 弹出窗口

- 如果window.open()的第二个参数不是已有窗口，

  则会执行什么操作？

  - 打开一个新窗口或标签页。

- 第三个参数，即特性字符串，用于什么？

  - 指定新窗口的配置。

- 如果没有传第三个参数，

  则新窗口（或标签页）会执行什么操作？

  - 带有所有默认的浏览器特性

    （工具栏、地址栏、状态栏等都是默认配置）

- 如果打开的不是新窗口，则执行什么操作？
  - 忽略第三个参数。

- 特性字符串是一个什么字符串？
  - 逗号分隔的设置字符串，
- 特性字符串用于什么？
  - 指定新窗口包含的特性

![image-20220331092202905](第 12 章 BOM.assets/image-20220331092202905.png)

- 这些设置需要以什么形式出现？
  - 逗号分隔的名值对
- 其中名值对以什么连接？
  - 等号

- 特性字符串中是否能包含空格？
  - 不能

```
window.open(
	"http://www.wrox.com/",
	"wroxWindow",
"height=400,width=400,top=10,left=10,resizable=yes"
);

```

- 这行代码会打开一个可缩放的新窗口，

  大小为400像素×400像素， 

  位于离屏幕左边及顶边各10像素的位置。 

- window.open()方法返回一个什么？

  - 对新建窗口的引用。

- 这个对象与普通window对象有什么区别？

  - 没有区别，
    - 只是为控制新窗口提供了方便。

- 某些浏览器默认不允许缩放或移动主窗口，

  但可能允许缩放或移动通过window.open()创建的窗口

  可以使用这个对象做什么？

  - 操纵新打开的窗口。

```
let wroxWin = window.open(
	"http://www.wrox.com/",
	"wroxWindow",
	"height=400,width=400,top=10,left=10,resizable=yes"
);

// 缩放 
wroxWin.resizeTo(500, 500);

// 移动
wroxWin.moveTo(100, 100);

```

- 可以使用什么方法关闭新打开的窗口？
  - close()

```
wroxWin.close();
```

- 这个方法只能用于什么窗口？
  - window.open()创建的弹出窗口
- 弹出窗口可以调用什么方法来关闭自己？
  - top.close()
- 关闭窗口以后，窗口的引用只能用于什么？
  - 检查其closed属性

```
wroxWin.close();
alert(wroxWin.closed); // true

```

- 新创建窗口的window对象有一个属性opener，

  指向什么？

  - 打开它的窗口。
  - 即调用window.open()打开它的窗口或窗格的指针 

- opener属性只在什么对象有定义？
  - 弹出窗口的最上层window对象（top）

```
let wroxWin = window.open(
	"http://www.wrox.com/",
	"wroxWindow",
	"height=400,width=400,top=10,left=10,resizable=yes"
);
alert(wroxWin.opener === window); // true

```

- 窗口是否会跟踪记录自己打开的新窗口？
  - 不会
    - 因此开发者需要自己记录。

- 在某些浏览器中，每个标签页会运行在什么进程中？

  - 独立的

- 如果一个标签页打开了另一个，

  而window对象需要跟另一个标签页通信

  ，那么标签是否能运行在独立的进程中？

  - 不能

- 将新打开的标签页的opener属性设置为null表示什么？

  - 新打开的标签页可以运行在独立的进程中

```
let wroxWin = window.open(
	"http://www.wrox.com/",
	"wroxWindow",
	"height=400,width=400,top=10,left=10,resizable=yes"
);
wroxWin.opener = null;
```

- 把opener设置为null表示什么？
  - 新打开的标签页不需要与打开它的标签页通信，
    - 因此可以在独立进程中运行。
- 这个连接一旦切断，是否可以恢复？
  - 不可恢复

#### \02. 安全限制 

- 浏览器会在什么情况下才允许创建弹窗？
  - 在用户操作下
- 在网页加载过程中调用window.open()是否有效果？
  - 没有效果
    - 而且还可能导致向用户显示错误。 

- 弹窗通常可能在什么情况下才能打开？
  - 鼠标点击
  - 或按下键盘中某个键

- 代码如果来自服务器，则会施加什么限制？
  - 弹窗限制

#### \03. 弹窗屏蔽程序  

- 是否所有现代浏览器都内置了屏蔽弹窗的程序？

  - 是

- 如果浏览器内置的弹窗屏蔽程序阻止了弹窗，

  那么window.open()很可能会返回什么？

  - null。

- 只要检查window.open()方法的返回值

  就可以知道什么？

  - 弹窗是否被屏蔽了

```
let wroxWin = window.open("http://www.wrox.com", "_blank");

if (wroxWin == null) {
	alert("The popup was blocked!");
}

```

- 在浏览器扩展或其他程序屏蔽弹窗时，

  window.open()通常会执行什么操作？

  - 抛出错误。

- 要准确检测弹窗是否被屏蔽，

  除了检测window.open()的返回值，

  还要做什么？

  - 把它用try/catch包装起来

```
let blocked = false;

try {
	let wroxWin = window.open("http://www.wrox.com", "_blank");
	if (wroxWin == null) {
		blocked = true;
	}
} catch (ex) {
	blocked = true;
}
if (blocked) {
	alert("The popup was blocked!");
}

```

- 注意 检查弹窗是否被屏蔽，

  是否影响浏览器显示关于弹窗被屏蔽的消息？

  - 不影响

### **12.1.7** 定时器

- JavaScript在浏览器中是怎么执行的
  - 单线程执行的，

- 使用定时器做什么？
  - 指定在某个时间之后
    - 执行相应的代码。
  - 每隔一段时间
    - 执行相应的代码。

- setTimeout()用于什么？
  - 指定在一定时间后执行某些代码
- setInterval()用于什么？
  - 指定每隔一段时间执行某些代码。 

- setTimeout()方法通常接收什么参数？

  - 要执行的代码
  - 在执行回调函数前等待的时间（毫秒）。

- setTimeout()方法第一个参数可以是什么？

  - 包含JavaScript代码的字符串 

  - 一个函数

```
// 在1秒后显示警告框 
setTimeout(() => alert("Hello world!"), 1000);

```

- setTimeout()方法第二个参数是什么？
  - 要等待的毫秒数
    - 而不是要执行代码的确切时间。

- 为了调度不同代码的执行，

  JavaScript维护了一个什么？

  - 任务队列

- 其中的任务会什么顺序执行？

  - 按照添加到队列的先后顺序

- setTimeout()的第二个参数告诉JavaScript引擎什么？

  - 在指定的毫秒数过后

    把任务添加到这个队列

- 如果队列是空的，则会执行什么操作？
  - 立即执行该代码。
- 如果队列不是空的，则执行什么操作？
  - 代码必须等待前面的任务执行完才能执行。 

- 调用setTimeout()时，会返回什么？
  - 一个表示该超时排期的数值ID
- 这个超时ID表示什么？
  - 被排期执行代码的唯一标识符，
    - 可用于取消该任务
- 如何取消等待中的排期任务？
  - 调用clearTimeout()方法
  - 并传入超时ID

```
// 设置超时任务
let timeoutId = setTimeout(() => alert("Hello world!"), 1000);

// 取消超时任务 
clearTimeout(timeoutId);

```

- 只要是在什么时候调用clearTimeout()，

  就可以取消超时任务？

  - 指定时间到达之前

- 在任务执行后再调用clearTimeout()是否有效果？
  - 没有效果

- 所有超时执行的代码（函数）都会在哪里执行？

  - 在全局作用域中的一个匿名函数中运行

- 函数中的this值指向什么？

  - 非严格模式下始终指向window
  - 在严格模式下是undefined

- 如果给setTimeout()提供了一个箭头函数，

  那么this会指向什么？

  - 保留为定义它时所在的词汇作用域。

- setInterval()指定的任务是什么？

  - 会每隔指定时间就执行一次，
  - 直到取消循环定时或者页面卸载。

- setInterval()接收哪两个参数？

  - 要执行的代码（字符串或函数）

  - 把下一次执行定时代码的任务

    添加到队列要等待的时间（毫秒）

```
setInterval(() => alert("Hello world!"), 10000);
```

- 第二个参数间隔时间，指的是什么？

  - 向队列添加新任务之前等待的时间。

- 浏览器是否关心这个任务什么时候执行

  或者执行要花多长时间？

  - 不关心

- 什么回调函数比较适合setInterval(）？
  - 执行时间短、非阻塞的 

- setInterval()方法也会返回什么？
  - 一个循环定时ID，
  - 可以用于在未来某个时间点上取消循环定时。
- 如何取消循环定时？
  - 可以调用clearInterval()并传入定时ID。
- 如果一直不管它，那么定时任务会怎么做？
  - 一直执行到页面卸载

```
let num = 0,
	intervalId = null;
let max = 10;
let incrementNumber = function () {
	num++;

	// 如果达到最大值，则取消所有未执行的任务
	if (num == max) {
		clearInterval(intervalId);
		alert("Done");
	}
};
intervalId = setInterval(incrementNumber, 500);

```

- 这个模式可以使用setTimeout()来实现

```
let num = 0;
let max = 10;
let incrementNumber = function () {
	num++;
	// 如果还没有达到最大值，再设置一个超时任务
	if (num < max) {
		setTimeout(incrementNumber, 500);
	} else {
		alert("Done");
	}
};
setTimeout(incrementNumber, 500);

```

- 为什么在使用setTimeout()时，不一定要记录超时ID？

  - 因为它会在条件满足时自动停止，

    否则会自动设置另一个超时任务。

- 这个模式是设置循环任务的推荐做法。

- 为什么setInterval()在实践中很少会在生产环境下使用？ 

  - 因为一个任务结束和下一个任务开始之间的时间间隔

    是无法保证的

  - 有些循环定时任务可能会因此而被跳过。

- 一般来说，最好不要使用setInterval()。

### **12.1.8** 系统对话框

- 使用alert()、confirm()和prompt()方法，

  可以做什么？

  - 让浏览器调用系统对话框向用户显示消息。

- 这些对话框与浏览器中显示的网页是否有关？

  - 无关
    - 且不包含HTML

- 它们的外观由什么决定？

  - 操作系统或者浏览器

- 是否能够使用CSS设置？

  - 不能

- 这些对话框都是什么对话框？

  - 同步的模态对话框

- 什么是同步的模态对话框？

  - 在它们显示的时候 
    - 代码会停止执行，
  - 在它们消失以后，
    - 代码才会恢复执行。

- alert()方法它接收什么参数？

  - 一个要显示给用户的字符串。

- alert()只接收几个参数？

  - 一个

- 调用alert()时，会显示什么？

  - 传入的字符串会显示在一个系统对话框中
  - 对话框只有一个“OK”（确定）按钮。

- 如果传给alert()的参数不是一个原始字符串，

  则会执行什么操作？

  - 调用这个值的toString()方法

    将其转换为字符串。

- 警告框（alert）通常用于什么？
  - 向用户显示一些他们无法控制的消息，
    - 比如报错。
- 用户唯一的选择就是什么？
  - 在看到警告框之后把它关闭。

![image-20220331101255433](第 12 章 BOM.assets/image-20220331101255433.png)

- 确认框，通过调用什么方法来显示？
  - confirm()
- 确认框跟警告框的不同之处在于什么？
  - 确认框有两个按钮：
    - “Cancel”（取消）
    - “OK”（确定）
- 用户通过单击不同的按钮表明什么？
  - 希望接下来执行什么操作。

![image-20220331101435709](第 12 章 BOM.assets/image-20220331101435709.png)

- 如何知道用户单击了OK按钮还是Cancel按钮？

  - 可以判断confirm()方法的返回值：

    - true表示单击了OK按钮，

    - false表示单击了Cancel按钮

      或者通过单击某一角上的X图标关闭了确认框。

- 确认框的典型用法如下所示：

```
if (confirm("Are you sure?")) {
	alert("I'm so glad you're sure!");
} else {
	alert("I'm sorry to hear you're not sure.");
}

```

- 确认框通常用于什么？
  - 让用户确认执行某个操作，
    - 比如删除邮件等。
- 为什么这种对话框应该在必要时再使用？
  - 因为会完全打断正在浏览网页的用户

- 提示框，通过调用什么方法来显示？
  - prompt()
- 提示框的用途是什么？
  - 提示用户输入消息。
- 除了OK和Cancel按钮，提示框还会显示一个什么？
  - 文本框，
    - 让用户输入内容。
- prompt()方法接收哪两个参数？
  - 要显示给用户的文本，
  - 文本框的默认值（可以是空字符串）。

![image-20220331101818721](第 12 章 BOM.assets/image-20220331101818721.png)

- 如果用户单击了OK按钮，则prompt()会返回什么？

  - 文本框中的值。

- 如果用户单击了Cancel按钮，或者对话框被关闭，

  则prompt()会返回什么？

  - null

```
let result = prompt("What is your name? ", "");

if (result !== null) {
	alert("Welcome, " + result);
}

```

- 这些系统对话框可以做什么？

  - 向用户显示消息、确认操作和获取输入。

- 如果网页中的脚本生成了两个或更多系统对话框，

  则会执行什么操作？

  - 除第一个之外

    所有后续的对话框上都会显示一个复选框，

  - 如果用户选中复选框
    - 则会禁用后续的弹框，直到页面刷新。

- 如果用户选中了复选框并关闭了对话框，

  在页面刷新之前，会执行什么操作？

  - 所有系统对话框（警告框、确认框、提示框）

    都会被屏蔽。

- 开发者是否获悉这些对话框是否显示了？

  - 否

- 对话框计数器会在什么时候重置？

  - 浏览器空闲时

- 如果两次独立的用户操作分别产生了两个警告框，

  则两个警告框上是否会显示屏蔽复选框？

  - 都不会

- 如果一次独立的用户操作连续产生了两个警告框，

  则会发生什么？

  - 第二个警告框会显示复选框。

- find()和print()对话框都是同步还是异步显示的？
  - 异步
    - 即控制权会立即返回给脚本。
- 如何显示它们？

```
// 显示打印对话框 
window.print();

// 显示查找对话框 
window.find();

```

- 这两个方法是否会返回

  任何有关用户在对话框中执行了什么操作的信息？

  - 不会
    - 因此很难加以利用。

- 浏览器的对话框计数器是否会涉及它们？

  - 不会
  - 因为这两种对话框是异步的，

- 用户选择禁用对话框是否对它们有影响？

  - 没有影响