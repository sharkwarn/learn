## new 的实现


```javascript
function myNew(func, ...arg) {
    if (typeof func !== 'function') {
        return throw('this first param must be a function')
    }

    let obj = Object.create(func.prototype);
    const result = func.call(obj, ...arg);
    const isObject = typeof result === 'object' && result !== null;
    const isFunctoin = typeof result === 'function';
    if (isObject || isFunctoin) {
        return result;
    } else {
        return obj;
    }
}
```