let textbox = document.getElementById("myText");
textbox.addEventListener("compositionstart", (event) => {
	console.log(event.data);
});
textbox.addEventListener("compositionupdate", (event) => {
	console.log(event.data);
});
textbox.addEventListener("compositionend", (event) => {
	console.log(event.data);
});