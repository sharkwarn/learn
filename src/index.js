

// 快速排序

function swap(arr, left, right) {
    [arr[right], arr[left]] = [arr[left], arr[right]];
}


function partition(arr, left, right) {
    if (arr.length <= 1) {
        return left;
    }
    let part = arr[Math.floor((left + right)/2)];
    while (left <= right) {
        while (arr[left] < part) {
            left++;
        }
        while (arr[right] > part) {
            right++;
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
    if (arr.length > 1) {
        let index = partition(arr, left, right);
        if (index > left) {
            quick(arr, left, index);
        }
        if (index < right) {
            quick(arr, index, right);
        }
    }
    return arr;
}