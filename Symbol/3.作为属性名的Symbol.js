// 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"


// 上面代码通过方括号结构和Object.defineProperty，将对象的属性名指定为一个 Symbol 值。

// 注意，Symbol 值作为对象属性名时，不能用点运算符。

const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"

// 上面代码中，因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值。

// 同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。

let s = Symbol();

let obj = {
  [s]: function (arg) {  }
};

obj[s](123);

// 上面代码中，如果s不放在方括号中，该属性的键名就是字符串s，而不是s所代表的那个 Symbol 值。

// 采用增强的对象写法，上面代码的obj对象可以写得更简洁一些。

let obj = {
  [s](arg) { }
};

// Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
const log = {};

log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');


// 下面是另外一个例子。

// 常量使用 Symbol 值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的switch语句会按设计的方式工作。

// 还有一点需要注意，Symbol 值作为属性名时，该属性还是公开属性，不是私有属性。