let o = {
    [Symbol('foo')]: 'foo val',
    [Symbol('bar')]: 'bar val'
};

// {Symbol(foo): "foo val", Symbol(bar): "bar val"}
console.log(o);

let barSymbol = Object.getOwnPropertySymbols(o)
    .find((symbol) => symbol.toString().match(/bar/));

// Symbol(bar)
console.log(barSymbol);
