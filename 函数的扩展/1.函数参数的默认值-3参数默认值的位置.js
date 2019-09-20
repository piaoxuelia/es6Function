// 通常情况下，定义了默认值的参数，应该是函数的尾参数
// 例一
function f(x = 1, y) {
    return [x, y];
  }
  
  f() 
  f(2) 
  f(, 1) // 报错
  f(undefined, 1)
  
  // 例二
  function f(x, y = 5, z) {
    return [x, y, z];
  }
  
  f() // [undefined, 5, undefined]
  f(1) // [1, 5, undefined]
  f(1, ,2) // 报错
  f(1, undefined, 2) // [1, 5, 2]

  /*============================================================*/
  
//   如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
function foo(x = 5, y = 6) {
    console.log(x, y);
  }
  
  foo(undefined, null)
  // 5 null




var x = 1;
 
function foo(x=1, y = function() { x = 2; }) {
  var x;
  y(); // is `x` shared?
  console.log(x); // no, still 3, not 2
}
 
foo();