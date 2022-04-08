// 创建一个新SVG元素 
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

// 创建一个任意命名空间的新属性 
let att = document.createAttributeNS("http://www.somewhere.com", "random");

// 获取所有XHTML元素 
let elems = document.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "*");