
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