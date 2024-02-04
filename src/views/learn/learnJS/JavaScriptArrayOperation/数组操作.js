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

let a = [1, 2, 3];
console.log(a instanceof Object); // true
a = {}
console.log(a instanceof Object); // true