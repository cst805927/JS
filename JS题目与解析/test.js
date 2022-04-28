let promise = new Promise(function (fulfilled) {
    let xhr = new XMLHttpRequest();
    xhr.open("post", "server.php");
    xhr.onload = function () {
        fulfilled.call(this);
    };
    xhr.send(null);
});

promise.then(function () {
    console.log("nest1");
}).then(function () {
    console.log("nest2");
}).then(function () {
    console.log("nest3");
});