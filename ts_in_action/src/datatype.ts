// 原始类型
let bool: boolean = true
let num: number = 123
let str: string = 'abc'

// 数组
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]
let arr3: Array<number | string> = [1, 2, 3, '4']

// 元组 限定个数和类型
let tuple: [number, string] = [0, '1']
// 不建议使用，通过push再加，虽然能加，但是不能越界访问
// let tuple2: [number, string] = [0, '1', 2]
// tuple.push(2)
// console.log(tuple)
// tuple[2]

// 函数 ,返回值通常可以省略，ts类型推断功能
let add = (x: number, y: number) => x + y
let computed: (x: number, y: number) => number
computed = (a, b) => a + b;
// 分两次的不同，:,=， 声明时要注明返回类型



//对象
let obj: object = {x: 1, y:2}
//obj.x = 2; 不能这样做 ,只定义了他是object，没有具体说他有哪些属性
let obj2: {x: number, y: number} = {x: 1, y: 2}

//symbol 
let s1: symbol = Symbol()
let s2: symbol = Symbol()
//console.log(s1 === s2) //false

//undefined, null
let un: undefined = undefined
let nu: null = null
// undefined,null 是任何类型的子类型
// let num3: number | undefined | null = 123
// num3 = null

// void 一种操作符，可以让任何表达式返回undefined 最便捷的返回undefined, void 0
// undefined, function() {var undefined = 0; console.log(undefined)} 
let noReturn = () => {}
//返回是undefined.

// any,不指定就是any 兼容js
let any 

//never 永不有返回值 ,返回错误，死循坏
let error = () => {
  throw new Error('no')
}

let endless = () => {
  while(true) {}
}

// 声明类型是好的编程习惯。
