



// 单向链表
class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor (arr) {
        this.head = new ListNode()
        let current = this.head;
        arr.forEach(item => {
            current.next = new ListNode(item);
            current = current.next;
        });
    }
    
    insert(pos, value) {
        let current = this.head;
        let node = new ListNode(value);
        let count = 0;
        while (count < pos && current) {
            current = current.next;
            count++;
        }
        if (count === pos) {
            node.next = current.next;
            current.next = node;
        } else {
            console.log('不存在该节点');
        }
    }
    
    // 增加操作
    add(value) {
        let current = this.head;
        while (!(current.next === null || current.next === undefined)) {
            current = current.next;
        }
        current.next = new ListNode(value);
    }

    // 删除操作
    remove(pos) {
        let current = this.head;
        let count = 0;
        while (count < pos && current) {
            current = current.next;
            count++;
        }
        if (current && current.next && current.next.next) {
            current.next = current.next.next;
        } else if (current) {
            current.next = null;
        } else {
            console.log('不存在该节点');
        }
    }

    // 反转链表
    reverse() {
        let current = this.head;
        let pre = null;
        while (current) {
            let next = current.next;
            current.next = pre;
            pre = current;
            current = next;
        }
        this.head = pre;
    }

    // 递归的写法
    reverse2() {
        let func = (pre, current) => {
            let next = null;
            if (!current) {
                return pre;
            }
            next = current.next;
            current.next = pre;
            return func(current, next);
        }
        const a = func(null, this.head);
        this.head.next = a;
    }
}

const a = new LinkedList([1, 2, 3, 4, 5, 6]);
a.add(7);
a.insert(3, 2);
a.remove(3);
a.remove(6);
a.reverse2();
console.log(a);

// 合并两个有序的链表
function mergeList(l, r) {
    let head = new ListNode();
    let current = head;
    // 该写法优化
    // while (l || r) {
    //     if (l && !r) {
    //         current.next = l;
    //         l = null;
    //     } else if (!l && r) {
    //         current.next = r;
    //         r = null;
    //     }else if (l.value > r.value) {
    //         current.next = r;
    //         current = current.next;
    //         r = r.next;
    //     } else {
    //         current.next = l;
    //         current = current.next;
    //         l = l.next;
    //     }
    // }
    while (l && r) {
        if (l.value > r.value) {
            current.next = r;
            r = r.next;
        } else {
            current.next = l;
            l = l.next;
        }
        current = current.next;
    }
    return head.next;
}

const b = new LinkedList([1, 3, 5, 7]);
const c = new LinkedList([2, 4, 6, 8, 9, 10]);
const d = mergeList(b.head.next, c.head.next);
// console.log(d);


//


// 双向链表
class DoubleListNode {
    constructor(value, pre = null) {
        this.value = value;
        this.pre = pre;
        this.next = null;
    }
}

class DoubleLinkedList {
    constructor (arr) {
        this.head = new ListNode()
        let current = this.head;
        arr.forEach(item => {
            current.next = new ListNode(item, current);
            current = current.next;
        });
    }
}

// const b = new DoubleLinkedList([1, 2, 3, 4, 5, 6]);
// console.log(b);