// （1）复制数组
// 数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。

const a1 = [1, 2];
const a2 = a1;

a2[0] = 2;
a1 // [2, 2]

// 上面代码中，a2并不是a1的克隆，而是指向同一份数据的另一个指针。修改a2，会直接导致a1的变化。

// ES5 只能用变通方法来复制数组。

const a1 = [1, 2];
const a2 = a1.concat();

a2[0] = 2;
a1 // [1, 2]
// 上面代码中，a1会返回原数组的克隆，再修改a2就不会对a1产生影响。


/*============================================================*/

// 扩展运算符提供了复制数组的简便写法。

const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;


// 上面的两种写法，a2都是a1的克隆。

/*============================================================*/
// 扩展运算符提供了数组合并的新写法。

const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];

// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]


// 不过，这两种方法都是【【【浅拷贝】】】，使用的时候需要注意。

const a1 = [{ foo: 1 }];
const a2 = [{ bar: 2 }];

const a3 = a1.concat(a2);
const a4 = [...a1, ...a2];

a3[0] === a1[0] // true
a4[0] === a1[0] // true

// 上面代码中，a3和a4是用两种不同方法合并而成的新数组，但是它们的成员都是对原数组成员的引用，这就是浅拷贝。如果修改了原数组的成员，会同步反映到新数组。

/*============================================================*/
// （3）与解构赋值结合

// 扩展运算符可以与解构赋值结合起来，用于生成数组。

// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

// 下面是另外一些例子。

const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []

/*============================================================*/
// 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错


/*============================================================*/

// （4）字符串

// 扩展运算符还可以将字符串转为真正的数组。
[...'hello']
// [ "h", "e", "l", "l", "o" ]

// 上面的写法，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。

'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3

// 上面代码的第一种写法，JavaScript 会将四个字节的 Unicode 字符，识别为 2 个字符，采用扩展运算符就没有这个问题。因此，正确返回字符串长度的函数，可以像下面这样写。

function length(str) {
    return [...str].length;
}

length('x\uD83D\uDE80y') // 3

// 凡是涉及到操作四个字节的 Unicode 字符的函数，都有这个问题。因此，最好都用扩展运算符改写。

let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'

// 上面代码中，如果不用扩展运算符，字符串的reverse操作就不正确。


/*============================================================*/
// （5）实现了 Iterator 接口的对象

// 任何定义了遍历器（Iterator）接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组。

let nodeList = document.querySelectorAll('div');
let array = [...nodeList];

// 上面代码中，querySelectorAll方法返回的是一个NodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了 Iterator 。

/*===========================================*/
Number.prototype[Symbol.iterator] = function*() {
    let i = 0;
    let num = this.valueOf();
    while (i < num) {
      yield i++;
    }
  }
  
  console.log([...5]) // [0, 1, 2, 3, 4]
//   上面代码中，先定义了Number对象的遍历器接口，扩展运算符将5自动转成Number实例以后，就会调用这个接口，就会返回自定义的结果。
// 对于那些没有部署 Iterator 接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
  };
  
  // TypeError: Cannot spread non-iterable object.
  let arr = [...arrayLike];
//   上面代码中，arrayLike是一个类似数组的对象，但是没有部署 Iterator 接口，扩展运算符就会报错。这时，可以改为使用Array.from方法将arrayLike转为真正的数组。



/*============================================================*/
// （6）Map 和 Set 结构，Generator 函数
// 扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。

let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
  ]);

let arr = [...map.keys()]; // [1, 2, 3]

// Generator 函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

const go = function*(){
    yield 1;
    yield 2;
    yield 3;
  };
  
  [...go()] // [1, 2, 3]

//   上面代码中，变量go是一个 Generator 函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。


// 如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错。

const obj = {a: 1, b: 2};
let arr = [...obj]; // TypeError: Cannot spread non-iterable object

