let btn = document.getElementById("myBtn");
let handler = function () {
	console.log(this.id);
};

btn.addEventListener("click", handler, false);

// 其他代码

btn.removeEventListener("click", handler, false); // 有效果！
