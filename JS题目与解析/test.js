$("#name").val(); // 第一种
$("#name").find("option:selected").val(); // 第二种
let index = $("#name").get(0).selectedIndex; // 第三种
$("#name").find("option:eq(" + index + ")").val();