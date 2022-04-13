function isPosterity(ancestor, element) {
    while (element) {
        if (element === ancestor) {
            return true;
        }
        element = element.parentNode;
    }
    return false;
}