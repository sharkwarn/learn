### 关于slice()、substr()、substring()方法

相同点
- 参数：都支持接受两个参数，第一个参数都是代表截取的开始位置。第二个参数除了 substr() ，其他两个 slice() 和 substring() 都是代表截取的结束位置.
- 都只接收一个参数的情况下，都是从起始位置一致截取到末尾


### slice

```js
let str = '12345';
let sli1 = str.slice(-3, 4);  // '34'
let sli1 = str.slice(3, -1);  // '4'
let sli1 = str.slice(-3, -1);  // '34'
```
可以看出 slice() 方法会将传入的负数与字符串的长度相加，将其转为正数的情况，如 str.slice(-3, 4) 就相当于 str.slice(2, 4)

### substr

```js
let str = '12345';
let sli1 = str.substr(-3, 2);  // '34'
let sli1 = str.substr(3, -1);  // ''
let sli1 = str.substr(-3, -1);  // ''

```

substr() 第一个参数也是将传入的负数与字符串长度相加，转为正数。重点是第二个参数，如果是负数则会默认截取的长度为 0。所以最后两条语句都返回了空字符串 ''

### substring

```js
let str = '12345';
let sli1 = str.substring(-3, 3);  // '123'
let sli1 = str.substring(3, -1);  // '123'
let sli1 = str.substring(-3, -1);  // ''
```

- substring() 会把接收到的负数，全部转为 0 再进行截取。
- 接收两个参数时，该方法会先对比两个参数的大小（如有负数会先处理再比较），把较小的一方当做截取的开始位置，较大一方当做截取的结束位置

