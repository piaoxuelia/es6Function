// 尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

// 下面是一个正常的递归函数。
function sum(x, y) {
    if (y > 0) {
        return sum(x + 1, y - 1);
    } else {
        return x;
    }
}

sum(1, 10000)
// Uncaught RangeError: Maximum call stack size exceeded(…)
//   超出调用栈的最大次数。

/*============================================================*/
// 蹦床函数（trampoline）可以将递归执行转为循环执行。
function trampoline(f) {
    while (f && f instanceof Function) {
        f = f();
    }
    return f;
}

function sum(x, y) {
    if (y > 0) {
        return sum.bind(null, x + 1, y - 1);
        // sum函数的每次执行，都会返回自身的另一个版本。
    } else {
        return x;
    }
}
console.log(trampoline(sum(1, 100000)))
// 蹦床函数并不是真正的尾递归优化

/*============================================================*/
  function tco(f) {
    var value;
    var active = false;
    var accumulated = [];
    return function accumulator() {
      accumulated.push(arguments);
      if (!active) {
        active = true;
        while (accumulated.length) {
          value = f.apply(this, accumulated.shift());
        }
        active = false;
        return value;
      }
    };
  }
  
  var sum = tco(function(x, y) {
    if (y > 0) {
      return sum(x + 1, y - 1)
    }
    else {
      return x
    }
  });
  console.log(sum(1, 100000))

// tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，总是有值的，这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。
