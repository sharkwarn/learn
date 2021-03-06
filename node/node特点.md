## node特点

### 1.单线程

优点： 操作系统完全不再有线程创建、销毁的时间开销。
缺点： 线程的崩溃，整个服务都崩溃了。

### 2.非阻塞I/O

优点：提高了执行效率，避免空闲时阻塞程序。

### 3.事件驱动

不管是新用户的请求，还是老用户的I/O完成，都将以事件方式加入事件环，等待调度。


### 综合分析
善于I/O，不善于计算。因为Node.js最擅长的就是任务调度，如果你的业务有很多的CPU计算，实际上也相当于这个计算阻塞了这个单线程，就不适合Node开发。
当应用程序需要处理大量并发的I/O，而在向客户端发出响应之前，应用程序内部并不需要进行非常复杂的处理的时候，Node.js非常适合。Node.js也非常适合与web socket配合，开发长连接的实时交互应用程序。

