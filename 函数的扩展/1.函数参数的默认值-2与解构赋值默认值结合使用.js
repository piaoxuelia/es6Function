// 只使用了对象的解构赋值默认值，没有使用函数参数的默认值
function foo({x, y = 5}) {
    console.log(x, y);
}

foo({})
foo({x: 1})
foo({ x: 1, y: 2})
foo() 

/*============================================================*/

//   函数参数的默认值

function foo({x,y = 5} = {}) {
    console.log(x, y);
}

foo() 

/*============================================================*/
// 解构赋值默认值

function fetch(url, { body = '', method = 'GET', headers = {}}) {
    console.log(method);
}

fetch('http://example.com', {})

fetch('http://example.com')

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
    console.log('m1:',[x, y],arguments[0])
    return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
    console.log('m2:',[x, y],arguments[0],'\n')
    return [x, y];
}

// 差别：
// 函数没有参数的情况
m1() 
m2() 

// x 和 y 都有值的情况
m1({x: 3, y: 8}) 
m2({x: 3, y: 8}) 

// x 有值，y 无值的情况
m1({x: 3}) 
m2({x: 3}) 

// x 和 y 都无值的情况
m1({}) 
m2({}) 

m1({z: 3}) 
m2({z: 3}) 


