// 只使用了对象的解构赋值默认值，没有使用函数参数的默认值
function foo({
    x,
    y = 5
}) {
    console.log(x, y);
}

foo({})
foo({x: 1})
foo({
    x: 1,
    y: 2
})
foo() // TypeError: Cannot read property 'x' of undefined

/*============================================================*/

//   函数参数的默认值

function foo({
    x,
    y = 5
} = {}) {
    console.log(x, y);
}

foo() // undefined 5

/*============================================================*/
// 解构赋值默认值

function fetch(url, {
    body = '',
    method = 'GET',
    headers = {}
}) {
    console.log(method);
}

fetch('http://example.com', {})
// "GET"

fetch('http://example.com')
// 报错

/*============================================================*/
// 双重默认值

function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
    console.log(method);
  }
  
  fetch('http://example.com')
  // "GET"

/*============================================================*/
// 作为练习，请问下面两种写法有什么差别？

// 写法一
function m1({x = 0, y = 0} = {}) {
    return [x, y];
  }
  
  // 写法二
  function m2({x, y} = { x: 0, y: 0 }) {
    return [x, y];
  }

// 差别：
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]


