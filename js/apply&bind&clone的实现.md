

### apply的实现

```javascript
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
```

### bind 的实现

```javascript
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

```


### 深拷贝的实现

简化版没有考虑函数正则等。

```javascript


const obj = {
    a: 1,
    b: null,
    c: {
        d: 1,
        e: {
            f: 3
        }
    },
    h: [{a: 1}, {b: 2}, 3, 4, 5]
};

obj.c.e.g = obj.c;


function clone(target) {
    const result = {};
    const container = Object.create(null);
    container[result] = result;
    function deepClone(current, result, container) {
        if (typeof current !== Object) {
            return current;
        }
        for (let key in current) {
            if (typeof current[key] === Object) {
                if (container[current[key]]) {
                    result[key] = container[current[key]];
                } else {
                    result[key] = {};
                    if (Array.isArray(current[key])) {
                        result[key] = [];
                    }
                    deepClone(current[key], result, container);
                }
            } else {
                result[key] = current[key];
            }
        }
    }
    deepClone(target, result, container);
    return result;
}

const res = clone(obj);
console.log(res, 2222);

```