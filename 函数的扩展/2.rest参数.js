// 形式为...变量名
// 用于获取函数的多余参数，这样就不需要使用arguments对象了

// 利用 rest 参数，可以向该函数传入任意数目的参数。
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10


/*============================================================*/
// rest 参数代替arguments变量的例子

// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

// arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。下面是一个利用 rest 参数改写数组push方法的例子

/*============================================================*/
// 利用 rest 参数改写数组push方法

function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)
console.log(a)
/*============================================================*/
// rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。


// 报错
function f(a, ...b, c) {
  // ...
}


/*============================================================*/
// 函数的length属性，不包括 rest 参数。
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1

