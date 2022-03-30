async function sleep(delay) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}
async function foo() {
	const t0 = Date.now();
	await sleep(1500); // 暂停约1500毫秒
	console.log(Date.now() - t0);
}
foo(); // 1502
