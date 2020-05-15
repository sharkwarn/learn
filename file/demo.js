
function BlobImg() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        //这里得到的是Blob对象
        console.log(xhr.response);
        BlobToBase64(xhr.response);
        const img = new Image();
        img.src = URL.createObjectURL(xhr.response);
        // 这里得到的是一个blob的url
        console.log(URL.createObjectURL(xhr.response));
        document.body.appendChild(img);
    }
    xhr.open('GET', 'https://p3.pstatp.com/large/pgc-image/7073c03c446b47d2b1273638e034da4f');
    xhr.send();
}

function CanvasImg() {
    const img = new Image();
    // 不设置的话会出现跨域问题。
    img.crossOrigin = 'Anonymous';
    img.src = 'https://p3.pstatp.com/large/pgc-image/7073c03c446b47d2b1273638e034da4f';
    img.addEventListener('load', function() {
        console.log('加载完成');
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0);
        // 这一步转化成了base64
        const a = canvas.toDataURL();
        console.log(a);
        const img = new Image();
        img.src = a;
        document.body.appendChild(img);
    })
}
// CanvasImg();
// BlobImg();

function BlobToBase64(blob) {
    const reader = new FileReader();
    reader.onload = function(res) {
        console.log(res.target.result);
    }
    reader.readAsDataURL(blob)
}

const blob = new Blob(['<a id="a"><b id="b">hey!</b></a>'], {type : 'text/html'});
const reader2 = new FileReader();
reader2.onload = function(e) {
    console.log(e.target.result);
}
reader2.readAsText(blob);