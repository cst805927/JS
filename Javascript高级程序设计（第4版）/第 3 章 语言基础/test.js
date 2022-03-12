function diff(num1, num2) {
	if (num1 < num2) {
		return num2 - num1;
	} else {
		return num1 - num2;
	}
}
let s = "Nicholas";
let b = true;
let i = 22;
let u;
let n = null;
let o = new Object();
console.log(typeof s); // string console.log(typeof i); // number console.log(typeof b); // boolean console.log(typeof u); // undefined console.log(typeof n); // object console.log(typeof o); // object