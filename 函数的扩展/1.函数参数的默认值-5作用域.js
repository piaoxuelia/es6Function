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
 // ReferenceError: x is not defined

//  参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错”x 未定义“。

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
  x = 3;
  y();
  console.log(x);
}

foo() // 2
console.log(x);// 1