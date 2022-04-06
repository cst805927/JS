let parentElement = document.getElementById('parent');
let currentChildElement = parentElement.firstElementChild;

// 没有子元素，firstElementChild返回null，跳过循环 
while (currentChildElement) {
	// 这就是元素节点，做相应处理 
	processChild(currentChildElement);
	if (currentChildElement === parentElement.lastElementChild) {
		break;
	}
	currentChildElement = currentChildElement.nextElementSibling;
}