// var arr = new Array(3);
// console.log(arr.length); // 3
// console.log(arr[0]); // undefined

// var arr = [1, 2, 3, , 'hello'];
// for (var item of arr) {
//     if (item === undefined)
//         break;
//     console.log(item);
// }

// let arr = [1, 2, 3, , 'hello'];
// arr.forEach(function (currentValue) {
//     if (currentValue === undefined) {
//         return;
//     }
//     console.log(currentValue);
// });

// let arr = [1, 2, 3];
// console.log(typeof arr); // object

// let a = [1, 2, 3];
// console.log(a instanceof Object); // true
// a = {}
// console.log(a instanceof Object); // true

// let arr = [3, 2, 'a', 1, 'b', 'hello']
// arr.sort()
// console.log(arr) // [1, 2, 3, "a", "b", "hello"]

// let arr = [3, 2, 'a', 1, 'b', 'hello']
// arr.sort(function (a, b) {
//     if (a === b) {
//         return 0;
//     }
//     if (typeof a === typeof b) {
//         return a < b ? -1 : 1;
//     }
//     return typeof a < typeof b ? -1 : 1;
// });

// let arr = [3, 2, 'a', 1, 'b', 'hello']
// let result = arr.some((val) => val === 'a')
// console.log(result) // true

// let str = "1,2,3,4"
// // 将字符串转换为数组，元素为数字
// let arr = str.split(',').map(Number)
// console.log(arr) // [1, 2, 3, 4]


// function isEqual(arr1, arr2) {
//     // 如果两个数组的长度不一样，直接返回false
//     if (arr1.length !== arr2.length) {
//         return false;
//     }
//     for (let i = 0; i < arr1.length; i++) {
//         if (arr1[i] !== arr2[i]) {
//             return false;
//         }
//     }
//     return true;
// }
// let arr1 = [1, 2, 3];
// let arr2 = [1, 2, 3];
// console.log(isEqual(arr1, arr2)); // true
// let arr3 = [1, 2, 4, 5];
// let arr4 = [1, 2, 3];
// console.log(isEqual(arr3, arr4)); // false


// let arr1 = [1, 2, {name: '张三'}, [4, 5, 6], 'hello'];
// let arr2 = [1, 'hello', [4, 5]];
// console.log(JSON.stringify(arr1) === JSON.stringify(arr2)); // false


// let arr = [1, 2, , 4, 5];
// console.log(arr[2]); // undefined
// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]); // 1, 2, undefined, 4, 5
// }
// arr.forEach(item => {
//     console.log(item); // 1, 2, 4, 5
// });

// 判断 arr1 与 arr2 的内容是否相等，不考虑元素的顺序
function areArraysEqualIgnoreOrder(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }
    return true;
}

let arr1 = [1, 2, undefined, 4, 5];
let arr2 = [undefined, 1, 2, 4, 5];
console.log(areArraysEqualIgnoreOrder(arr1, arr2)); // true
console.log(JSON.stringify(arr1) === JSON.stringify(arr2)); // false


