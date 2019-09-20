// ES5 语法的多重嵌套函数：

function insert(value) {
    return {into: function (array) {
      return {after: function (afterValue) {
        array.splice(array.indexOf(afterValue) + 1, 0, value);
        return array;
      }};
    }};
  }
  
  insert(2).into([1, 3]).after(1); //[1, 2, 3]

/*============================================================*/
// 使用箭头函数改写：

let insert = (value) => ({into: (array) => ({after: (afterValue) => {
    array.splice(array.indexOf(afterValue) + 1, 0, value);
    return array;
  }})});
  
insert(2).into([1, 3]).after(1); //[1, 2, 3]

/*============================================================*/
// 下面是一个部署管道机制（pipeline）的例子，即前一个函数的输出是后一个函数的输入。



const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

addThenMult(5)

/** reduce()方法
 *  接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。对空数组是不会执行回调函数的。
 *  语法:  
 *  array.reduce(function(total, currentValue, currentIndex, arr){}, initialValue)
 *  total: 必需，初始值或计算后的返回值
 *  currentValue: 必需，当前元素
 *  currentIndex: 当前元素索引
 *  arr: 当前元素所属的数组对象
 */

// 如果觉得上面的写法可读性比较差，也可以采用下面的写法。

const plus1 = a => a + 1;
const mult2 = a => a * 2;

mult2(plus1(5))


/*============================================================*/
// 箭头函数还有一个功能，就是可以很方便地改写 λ 演算。

// λ演算的写法
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

// ES6的写法
var fix = f => (x => f(v => x(x)(v)))
               (x => f(v => x(x)(v)));