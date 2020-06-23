# Iterator

Iterator 接口主要供for...of消费

```javascript
function makeIterator(array) {
    let index = 0;
    return {
        next: function() {
            return index < array.length ? {
                value: array[index++]
            } : {
                value: undefined, done: true
            }
        }
    }
}
```
