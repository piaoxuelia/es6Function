// 创建 Symbol 的时候，可以添加一个描述。

const sym = Symbol('foo');

// 上面代码中，sym的描述就是字符串foo。

// 但是，读取这个描述需要将 Symbol 显式转为字符串，即下面的写法。

const sym = Symbol('foo');

String(sym) // "Symbol(foo)"
sym.toString() // "Symbol(foo)"

// 上面的用法不是很方便。ES2019 提供了一个实例属性description，直接返回 Symbol 的描述。

const sym = Symbol('foo');

sym.description // "foo"

