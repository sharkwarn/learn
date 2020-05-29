const array = [3,1,2,8,4,2,1,7,16,11,12,45,22];

function sort(arr) {
    for(var i = arr.length; i >= 0; i--) {
        for(var j = 0; j <= i; j++) {
            if (arr[i] < arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
    }
    return arr;
}

const res = sort(array);
console.log(res);