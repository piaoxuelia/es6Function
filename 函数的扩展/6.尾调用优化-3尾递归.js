// 函数调用自身，称为递归。如果尾调用自身，就称为尾递归
// 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}

factorial(5) // 120

// 上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n) 

/*============================================================*/
// 如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

function factorial(n, total) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
}

factorial(5, 1) // 120


/*============================================================*/
//   Fibonacci 数列 斐波那契数列 

// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233，377，610，987，1597，2584，4181，6765，10946，17711，28657，46368

// 这个数列从第3项开始，每一项都等于前两项之和

// 非尾递归的 Fibonacci 数列实现如下。
function Fibonacci(n) {
    if (n <= 1) {
        return 1
    };

    return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时


/*============================================================*/
// 尾递归优化过的 Fibonacci 实现如下。

function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
    if( n <= 1 ) {return ac2};
  
    return Fibonacci2 (n - 1, ac2, ac1 + ac2);
  }
  
  console.log(Fibonacci2(100)) // 573147844013817200000
  console.log(Fibonacci2(1000)) // 7.0330367711422765e+208
  console.log(Fibonacci2(10000)) // Infinity

  // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233，377，610，987，1597，2584，4181，6765，10946，17711，28657，46368