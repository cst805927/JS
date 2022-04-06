let strongElements = document.querySelectorAll("p strong");

// 以下3个循环的效果一样
for (let strong of strongElements) {
	strong.className = "important";
}
for (let i = 0; i < strongElements.length; ++i) {
	strongElements.item(i).className = "important";
}
for (let i = 0; i < strongElements.length; ++i) {
	strongElements[i].className = "important";
}
