let count = 0;

function add() {
    count++
}


setTimeout(()=>{
    console.log(count, 111);
}, 2000)

export {
    count,
    add
}