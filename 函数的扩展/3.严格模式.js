// 从 ES5 开始，函数内部可以设定为严格模式。

function doSomething(a, b) {
    'use strict';
    // code
}

/*============================================================*/
// ES6 规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

// 报错
function doSomething(a, b = a) {
    'use strict';
    // code
  }
  
  // 报错
  const doSomething = function ({a, b}) {
    'use strict';
    // code
  };
  
  // 报错
  const doSomething = (...a) => {
    'use strict';
    // code
  };
  
  const obj = {
    // 报错
    doSomething({a, b}) {
      'use strict';
      // code
    }
  };


 /** 原因：
  * 函数内部的严格模式，同时适用于函数体和函数参数
  * 函数执行的时候，先执行函数参数，然后再执行函数体
  * 不合理的地方:只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行
  **/ 


//  规避这种限制
/*============================================================*/
// 第一种是设定全局性的严格模式
'use strict';

function doSomething(a, b = a) {
  // code
}
/*============================================================*/
// 函数包在一个无参数的立即执行函数里面
const doSomething = (function () {
    'use strict';
    return function(value = 42) {
      return value;
    };
  }());
