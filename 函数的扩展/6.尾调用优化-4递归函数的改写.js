// 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数
// 为什么计算5的阶乘，需要传入两个参数5和1？


// 方法一是在尾递归函数之外，再提供一个正常形式的函数。
function tailFactorial(n, total) {
    if (n === 1) return total;
    return tailFactorial(n - 1, n * total);
}

function factorial(n) {
    return tailFactorial(n, 1);
}

factorial(5) // 120

/*=============================================*/
//  这里也可以使用柯里化（currying）
// 通过柯里化，将尾递归函数tailFactorial变为只接受一个参数的factorial。
function currying(fn, n) {
    return function (m) {
        return fn.call(this, m, n);
    };
}

function tailFactorial(n, total) {
    if (n === 1) return total;
    return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

console.log(factorial(5)) // 120

/*============================================================*/
//  第二种方法就简单多了，就是采用 ES6 的函数默认值。
function factorial(n, total = 1) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
}

factorial(5) // 120