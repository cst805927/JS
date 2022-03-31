// 在所有浏览器中检测Flash 
function hasFlash() {
    var result = hasPlugin("Flash");
    if (!result) {
        result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
    }
    return result;
}

// 在所有浏览器中检测QuickTime 
function hasQuickTime() {
    var result = hasPlugin("QuickTime");
    if (!result) {
        result = hasIEPlugin("QuickTime.QuickTime");
    }
    return result;
}

// 检测Flash
alert(hasFlash());

// 检测QuickTime
alert(hasQuickTime());