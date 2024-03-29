// 尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

// 函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息
// 如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。
// 如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。

// 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

function f() {
    let m = 1;
    let n = 2;
    return g(m + n);
  }
  f();
  
  // 等同于
  function f() {
    return g(3);
  }
  f();
  
  // 等同于
  g(3);


//   “尾调用优化”（Tail call optimization），即只保留内层函数的调用帧
// 如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

/*============================================================*/

// 注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。

function addOne(a){
  var one = 1;
  function inner(b){
    return b + one;
  }
  return inner(a);
}
// 上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。
// 目前只有 Safari 浏览器支持尾调用优化，Chrome 和 Firefox 都不支持。