let container = document.getElementById("container");
container.addEventListener("click", function (event) {
    var element = event.target; // 当前事件目标
    if (element.tagName.toLowerCase() !== "a") {
        return;
    }
    alert(element.dataset.digit + element.innerHTML);
}, false);