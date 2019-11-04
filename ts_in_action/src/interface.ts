interface List {
  readonly id: number, // 只读属性
  name: string,
  //   [x: string]: any,
  age?: number// 可选属性
}

interface Result {
  data: List[]
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.name)
  })
}

let result = {
  data: [
    {id: 1, name: 'A', sex: 'male'},
    {id: 2, name: 'B', age: 10}
  ]
}

render(result)

// 如果直接传入对象自变量，多余的变量会报错
// render({
//   data: [
//     {id: 1, name: 'A', sex: 'male'},
//     {id: 2, name: 'B'}
//   ]
// })

// 1赋值给一个对象
// 2可以加断言
render({
  data: [
    {id: 1, name: 'A', sex: 'male'},
    {id: 2, name: 'B'}
  ]
} as Result)
// 断言还有一种方式,但在react中会产生歧义，建议上面的两种
render(<Result>{
  data: [
    {id: 1, name: 'A', sex: 'male'},
    {id: 2, name: 'B'}
  ]
})
// 3 字符串索引签名, 任意字符串索引list，可以得到任意的属性就可以了
// interface List {
//   id: number,
//   name: string,
//   [x: string]: any,
// }


interface StringArray {
  [index: number]: string, // 用任意的数字去索引StringArray就会得到一个string
}

let chars: StringArray = ['A', 'B']

interface Names {
  [x: string]: string, // 用任意的string去索引StringArray就会得到一个string
  //y: number // 此时再声明一个number类型的成员，不被允许的
  [z: number]: string //两种索引签名是可以混用的, 数字索引签名返回值一定要是string索引返回值的子类型。
  // [z2: number]: number, // 不行, 不是子类型，如果上面字符串索引返回值是any，就行
}

// 接口还能定义函数
// let add22: (x: number, y: number) => number

interface Add3 {
  (x: number, y: number): number
}

// 以上两种是等价的

// 类型别名, 为我们函数别名取一个名字，他名字就是Add4

type Add4 = (x: number, y: number) => number

let add5: Add4 = (a, b) => a + b 

// 混合接口定义类库
interface Lib {
  (): void;
  version: string,
  doSomething(): void,
}

// 单列，封装, 不封装就是全局暴露了一个lib,单例。 如果需要多个的实例，就封装成一个函数。
function getLib() {
  let lib: Lib = (() => {}) as Lib;
  lib.version = '1.0';
  lib.doSomething = () => {}
  return lib;
}

let lib1 = getLib();
console.log(lib1());
console.log(lib1.doSomething());
console.log(lib1.version);