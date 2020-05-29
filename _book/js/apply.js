let a = {
    a: 1,
    fn: function() {
        console.log(this.a);
    }
}

let b = {
    a: 'b'
};


Function.prototype.myApply = function(context, ...arg) {

    if (typeof context === 'object' || typeof context === 'function') {
        context = context || window
    }

    let fn = Symbol();
    // let fn = Math.random() * 1000  + '';
    context[fn] = this;
    const res = context[fn](...arg);
    return res;
}

const res = a.fn.myApply(b);
console.log(res);