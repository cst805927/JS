let selection = frames["richedit"].getSelection();

// 取得选中的文本 
let selectedText = selection.toString();

// 取得表示选区的范围 
let range = selection.getRangeAt(0);

// 高亮选中的文本 
let span = frames["richedit"].document.createElement("span");
span.style.backgroundColor = "yellow";
range.surroundContents(span)