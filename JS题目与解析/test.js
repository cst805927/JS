function reverse(str) {
    let result = "",
        begin = str.length - 1;
    for (let i = begin; i >= 0; i--) {
        result += str[i];
    }
    return result;
}