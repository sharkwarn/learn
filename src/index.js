
const obj = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.iterator]: function () {
        const that = this;
        const arr = [];
        for (let i in obj) {
            arr.push(i);
        }
        let k = 0;
        return {
            next: function () {
                return {
                    value: that[arr[k++]],
                    done: arr.length < k
                };
            }
        };
    }
}
for (let i of obj) {
    console.log(i);
}

