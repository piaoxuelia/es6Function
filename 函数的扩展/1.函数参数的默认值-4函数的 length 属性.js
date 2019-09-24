// 返回没有指定默认值的参数个数，指定了默认值后，length属性将失真

(function (a) {}).length 
(function (a = 5) {}).length 
(function (a, b, c = 5) {}).length 


// length属性的含义是，该函数 预期 传入的参数个数
// 某个参数指定默认值以后，预期传入的参数个数就不包括这个参数了
// rest 参数也不会计入length属性


(function(...args) {}).length // 0
// 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了

(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1

