var obj = {
    a:1,
    foo: function() {
        console.log(this.a);
    }
}

var bar = obj.foo;
bar();