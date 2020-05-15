# onload和ready的区别

## window.onload 
所有文件加载完毕后

## $(document).ready
在html的dom结构加载完成之后。jq的ready的实现是基于 DOMContentLoaded，低版本的ie浏览器是基于onreadystatechange。