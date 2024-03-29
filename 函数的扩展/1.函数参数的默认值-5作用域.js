// 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

var x = 1;
function f(x, y = x) {
  console.log(y);
}

f(2) // 2

// /*============================================================*/

let x = 1;
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
// 如果此时，全局变量x不存在，就会报错。

/*============================================================*/

var x = 1;
function foo(x = x) {
  // ...
}
foo()

// 参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错”x 未定义“。

/**
 * 暂时性死区 TDZ
 * 一个参数或变量在初始化之前不能使用
 * = x 是在参数的作用域，屏蔽了全局x,x在暂时性死区，x无法初始化为其自身
 */

// es5里，参数是属于函数的内部作用域
// Es6，参数属于一个中间范围的特殊作用域，不会和函数body共享

/*============================================================*/

let foo = 'outer';

function bar(func = () => foo) {
  let foo = 'inner';
  console.log(func());
}

bar(); 
/*============================================================*/
function bar(func = () => foo) {
    let foo = 'inner';
    console.log(func());
  }
  
  bar() // ReferenceError: foo is not defined


/*============================================================*/
//   更复杂的例子。

var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
console.log(x);

/*============================================================*/

var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3; // 未重新声明
  y();
  console.log(x);
}

foo() // 2
console.log(x);// 1


/*============================================================*/
// 存疑，函数内部只声明的情况？？？？
// 参数被赋初值之后是个特殊的作用域，不能访问函数体中的变量，只能访问自身变量及向外查找

// 例子1

var y = 1;
function foo(x = y) {
  var x
  console.log(x); 
}
foo();

/*----------------------*/

// 例子2
function foo(x = 2, y=function(){x = 3}) {
  var x;
  y();
  console.log(x); 
}
foo();
foo(5);

// 如果函数体内只是声明了和参数同名的变量，没有赋值，相当于在函数体内参数执行了赋值，var x; x = 参数值


function foo(x) {
  var x;
  console.log(x); 
}
foo(5);