// 1.箭头函数-函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
// 2.箭头函数-不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
// 3.箭头函数-不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
// 4.箭头函数-不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

function foo() {
    setTimeout(() => {
      console.log('id:', this.id);
    }, 100);
  }
  
  var id = 21;
  
  foo.call({ id: 42 });

/*============================================================*/

  function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);
    // 普通函数
    setInterval(function () {
      this.s2++;
    }, 1000);
  }
  
  var timer = new Timer();
  
  setTimeout(() => console.log('s1: ', timer.s1), 3100);
  setTimeout(() => console.log('s2: ', timer.s2), 3100);

/*============================================================*/
//   箭头函数可以让this指向固定化，这种特性很有利于封装回调函数。
var handler = {
    id: '123456',
  
    init: function() {
      document.addEventListener('click',
        event => this.doSomething(event.type), false);
    },
  
    doSomething: function(type) {
      console.log('Handling ' + type  + ' for ' + this.id);
    }
};

// this指向的固定化，并不是因为箭头函数内部有绑定this的机制
// 实际原因是:箭头函数根本没有自己的this
// 导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。

/*============================================================*/
// 例子

// ES6
  function foo() {
    setTimeout(() => {
      console.log('id:', this.id);
    }, 100);
  }
  // 箭头函数转成 ES5 的代码如下
  function foo() {
    var _this = this;
  
    setTimeout(function () {
      console.log('id:', _this.id);
    }, 100);
  }

/*============================================================*/
// 请问下面的代码之中有几个this？

function foo() {
    return () => {
      return () => {
        return () => {
          console.log('id:', this.id);
        };
      };
    };
  }
  
  var f = foo.call({id: 1});
  
  var t1 = f.call({id: 2})()(); // id: 1
  var t2 = f().call({id: 3})(); // id: 1
  var t3 = f()().call({id: 4}); // id: 1

/*============================================================*/
// 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：
// arguments、super、new.target。

function foo() {
    setTimeout(() => {
      console.log('args:', arguments);
    }, 100);
}

foo(2, 4, 6, 8)


/*============================================================*/
// 由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

var f = (function() {
    return [(() => this.x).bind({ x: 'inner' })()];
  }).call({ x: 'outer' });
console.log(f)



