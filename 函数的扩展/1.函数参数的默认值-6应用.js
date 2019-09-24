// 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误

  function throwIfMissing() {
    throw new Error('Missing parameter');
  }
  
  function foo(mustBeProvided = throwIfMissing()) {
    return mustBeProvided;
  }
  
  foo()

  /*============================================================*/
  // 可以将参数默认值设为undefined，表明这个参数是可以省略的。
  
  function foo(optional = undefined) {}

