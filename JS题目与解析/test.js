function findCommon(ar1, ar2, ar3) {
    let i = 0, j = 0, k = 0,
        n1 = ar1.length,
        n2 = ar2.length,
        n3 = ar3.length,
        share = "";
    // 遍历三个数组
    while (i < n1 && j < n2 && k < n3) {
        if (ar1[i] === ar2[j] && ar2[j] === ar3[k]) { // 找到公有元素就保存
            share += ar1[i] + " ";
            i++;
            j++;
            k++;
        } else if (ar1[i] < ar2[j]) { // ar1[i] 不可能是共有的元素
            i++;
        } else if (ar2[j] < ar3[k]) { // ar2[j] 不可能是共有的元素
            j++;
        } else { // ar3[k] 不可能是共有的元素
            k++;
        }
        console.log(share);
    }
}