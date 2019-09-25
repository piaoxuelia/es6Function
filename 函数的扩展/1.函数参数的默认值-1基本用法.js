// ES5 默认值变通的方法
function log(x, y) {
    y = y || 'World';
    console.log(x, y);
}

log('Hello')
log('Hello', 'China')
log('Hello', '')

// 缺点在于，如果参数y赋值了，但是对应的布尔值为false，则该赋值不起作用

/*============================================================*/
function log(x, y) {
    if (typeof y === 'undefined') {
        y = 'World';
    }
    console.log(x, y);
}

log('Hello')
log('Hello', 'China')
log('Hello', '')

/*============================================================*/
//   ES6 允许为函数的参数设置默认值

function log(x, y = 'World') {
    console.log(x, y);
}

log('Hello')
log('Hello', 'China')
log('Hello', '') 

/*============================================================*/

function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

const p = new Point();
console.log(p) // { x: 0, y: 0 }

/*============================================================*/
//   参数变量是默认声明的，所以不能用let或const再次声明

function foo(x = 5) {
    let x = 1; // error
    const x = 2; // error
}
foo()
/*============================================================*/
// 不报错
function foo(x, x, y) {
    // ...
}

// 报错
function foo(x, x, y = 1) {
    // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context

/*============================================================*/
//   参数默认值是惰性求值
let x = 99;

function foo(p = x + 1) {
    console.log(p);
}

foo()

x = 100;
foo()
