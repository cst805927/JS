let upload = document.getElementById("upload");

upload.addEventListener("change", function () {

    let file = this.files[0]; // 获取文件对象

    let reader = new FileReader(); // 创建FileReader实例

    reader.readAsDataURL(file);

    reader.onload = function (e) {

        // Data URL 格式的文件内容        
        console.log(this.result);
    };
    
}, false)