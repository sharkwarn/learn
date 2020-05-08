### 清除浮动


+ clear清除浮动（添加空div法）在浮动元素下方添加空div,并给该元素写css样式 {clear:both;height:0;overflow:hidden;}
+ 给浮动元素父级设置高度
+ 父级同时浮动（需要给父级同级元素添加浮动）
+ 父级设置成inline-block，其margin: 0 auto居中方式失效
+ 给父级添加overflow:hidden 清除浮动方法
+ 万能清除法 after伪类 清浮动（现在主流方法，推荐使用）
```
float_div:after{
    content:".";
    clear:both;
    display:block;
    height:0;
    overflow:hidden;
    visibility:hidden;
}
.float_div{
    zoom:1
}
```