// ES2019 对函数实例的toString()方法做出了修改。
// toString()方法返回函数代码本身，以前会省略注释和空格。

function /* foo comment */ foo () {}

foo.toString()
// function foo() {}


// 修改后的toString()方法，明确要求返回一模一样的原始代码。

function /* foo comment */ foo () {}

console.log(foo.toString())
// "function /* foo comment */ foo () {}"
