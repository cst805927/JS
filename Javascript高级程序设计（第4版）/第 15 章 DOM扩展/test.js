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