// import a from  './ts.ts';

const str = '123456';

function makeIterator(array) {
    let index = 0;
    return {
        next: function () {
            return index < array.length ? {
                value: array[index++]
            } : {
                    value: undefined, done: true
                }
        }
    }
}

let obj = {
    data: {
        a: 1, b: 2, c: 3
    },
    [Symbol.iterator]() {
        const self = this;
        const arr = [];
        for (let i in this.data) {
            if (this.data.hasOwnProperty(i)) {
                arr.push(i)
            }
        }
        let index = 0;
        return {
            next() {
                console.log(self.data[arr[index++]])
                if (index < arr.length) {
                    return {
                        value: self.data[arr[index++]],
                        done: false
                    };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
};

for (let i of obj) {
    console.log(i)
}