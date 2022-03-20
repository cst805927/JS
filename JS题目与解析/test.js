let str = "get-element-by-id";
str.replace(/-([a-z])/g, function (match, p1, index, input) {
    return p1.toUpperCase();
});