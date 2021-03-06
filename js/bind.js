Function.prototype.myBind = function(context, ...arg) {
    let self = this;
    console.log(context, self);
    return function F(...rest) {
        // 如果使用new将不会改变this的指向
        if (this instanceof F) {
            return new self(...arg, ...rest);
        }
        return self.apply(context, [...arg, ...rest]);
    }
}

let a = {
    a: 1,
    f: function() {
        console.log(this.a);
    }
};

let b = {
    a: 2
}

const c = a.f.myBind(b);

new c();

