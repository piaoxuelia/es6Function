// 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

// 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组。
let foo = { ...['a', 'b', 'c'] };
foo
// {0: "a", 1: "b", 2: "c"}

// 如果扩展运算符后面是一个空对象，则没有任何效果。
{...{}, a: 1}
// { a: 1 }

// 如果扩展运算符后面不是对象，则会自动将其转为对象。
// 等同于 {...Object(1)}
{...1} // {}

// 上面代码中，扩展运算符后面是整数1，会自动转为数值的包装对象Number{1}。由于该对象没有自身属性，所以返回一个空对象。

/* ================================================ */
// 下面的例子都是类似的道理。

// 等同于 {...Object(true)}
{...true} // {}

// 等同于 {...Object(undefined)}
{...undefined} // {}

// 等同于 {...Object(null)}
{...null} // {}

// 但是，如果扩展运算符后面是字符串，它会自动转成一个类似数组的对象，因此返回的不是空对象。
{...'hello'}
// {0: "h", 1: "e", 2: "l", 3: "l", 4: "o"}

/* ================================================ */
// 对象的扩展运算符等同于使用Object.assign()方法。
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);

/* ================================================ */
// 上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。

// 写法一
const clone1 = {
    __proto__: Object.getPrototypeOf(obj),
    ...obj
  };
  
  // 写法二
  const clone2 = Object.assign(
    Object.create(Object.getPrototypeOf(obj)),
    obj
  );
  
  // 写法三
  const clone3 = Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  )
//   上面代码中，写法一的__proto__属性在非浏览器的环境不一定部署，因此推荐使用写法二和写法三。

/* ================================================ */
//   扩展运算符可以用于合并两个对象。

let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);

// 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。
let aWithOverrides = { ...a, x: 1, y: 2 };
// 等同于
let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
// 等同于
let x = 1, y = 2, aWithOverrides = { ...a, x, y };
// 等同于
let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });

// 上面代码中，a对象的x属性和y属性，拷贝到新对象后会被覆盖掉。

/* ================================================ */
// 这用来修改现有对象部分的属性就很方便了。

let newVersion = {
    ...previousVersion,
    name: 'New Name' // Override the name property
  };

//   上面代码中，newVersion对象自定义了name属性，其他属性全部复制自previousVersion对象。

/* ================================================ */
// 如果把自定义属性放在扩展运算符前面，就变成了设置新对象的默认属性值。

let aWithDefaults = { x: 1, y: 2, ...a };
// 等同于
let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);
// 等同于
let aWithDefaults = Object.assign({ x: 1, y: 2 }, a);

// 与数组的扩展运算符一样，对象的扩展运算符后面可以跟表达式。

  const obj = {
    ...(x > 1 ? {a: 1} : {}),
    b: 2,
  };
/* ================================================ */
//   扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的。

// 并不会抛出错误，因为 x 属性只是被定义，但没执行
let aWithXGetter = {
    ...a,
    get x() {
      throw new Error('not throw yet');
    }
  };
  
  // 会抛出错误，因为 x 属性被执行了
  let runtimeError = {
    ...a,
    ...{
      get x() {
        throw new Error('throw now');
      }
    }
  };

