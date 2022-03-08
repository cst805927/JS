function printRaw(strings) {
    console.log('Actual characters:');
    for (const string of strings) {
        console.log(string);
    }
    console.log('Escaped characters:');
    for (const rawString of strings.raw) {
        console.log(rawString);
    }
}
printRaw `\u00A9${'and'}\n`;
// Actual characters:
// ©
// (换行符)
// Escaped characters:
// \u00A9
// \n