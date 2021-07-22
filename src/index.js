

// 手写一个promise

class MyPromise {
    
    constructor(fn) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.fulfilledCallback = [];
        this.rejectedCallback = [];
        try {
            fn(this.reslove, this.reject);
        } catch (err) {
            this.reject(err);
        }
    }

    reslove(value) {
        if (this.state === 'pending') {
            this.value = value;
            this.state = 'fulfilled';
            this.fulfilledCallback.forEach(fn => fn());
        }
    }

    reject(reason) {
        if (this.state === 'reject') {
            this.reason = reason;
            this.state = 'reject';
            this.rejectedCallback.forEach(fn => fn());
        }
    }

    then(onFulfilled, onRjected) {
        const promise2 = new MyPromise((reslove, reject) => {
            if (this.state === 'fulfilled') {
                let x = onFulfilled(this.value);
                reslove(x);
            }
            if (this.state === 'rejected') {
                let x = onRjected(this.reason);
                reject(x);
            }
            if (this.state === 'pending') {
                this.fulfilledCallback.push(() => {
                    // 生成高阶函数是为了，拿到返回的值
                    let x = onFulfilled(this.value);
                    // 如果返回的是promise，需要再做处理。
                    reslove(x);
                });
                this.rejectedCallback.push(() => {
                    let x = onRjected(this.reason);
                    reject(x);
                });
            }
        });
        return promise2;
    }
}