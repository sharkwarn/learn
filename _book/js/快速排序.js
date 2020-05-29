const array = [3,1,2,8,4,2,1,7,16,11,12,45,22];

function swap(arr, a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]];
}

function partition(arr, left, right) {
    const poivt = arr[Math.floor((left + right) / 2)];
    while (left <= right) {
        while(arr[left] < poivt) {
            left++;
        }
        while(arr[right] > poivt) {
            right--;
        }
        if (left <= right) {
            swap(arr, left, right);
            left++;
            right--;
        }
    }
    return left;
}


function quick(arr, left, right) {
    let index;
    if (arr.length > 1) {
        index = partition(arr, left, right);
        if (left < index - 1) {
            quick(arr, left, index - 1);
        }
        if (index < right) {
            quick(arr, index, right);
        }
    }
    return arr;
}


const res = quick(array, 0, array.length-1);
