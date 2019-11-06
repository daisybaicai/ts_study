// 泛型
// 不预先确定的数据类型，具体的类型在使用的时候才能确定

function log<T>(value: T): T {
  console.log(value);
  return value;
}

//1
log<String []>(['a', 'b'])

//2 通过ts的类型推断来简化
log(['a', 'b'])

// 泛型函数的实现
// type Log = <T>(value: T) => T
// let mylog: Log = log

// 泛型接口, 可以指定默认类型
interface Log<T = string> {
  (value: T): T
}

let myLog: Log<number> = log
let myLog2: Log = log
myLog(1)
myLog2('ABC')

// 把泛型变量与函数参数等同对待，他只不过是另一维度的参数

// 泛型类

// 1.静态成员不能引用类型参数，(static不行)
// class cLog<T> {
//   static run(value: T) {
//     console.log(value)
//     return value
//   }

// }

class cLog<T> {
  run(value: T) {
    console.log(value)
    return value
  }

}

let log1 = new cLog<number>()
log1.run(1)

// 不传入时，可以是任意的
let log2 = new cLog()
log2.run('1')
log2.run(2)

// 泛型约束


interface len {
  length: number
}

function Loglen<T extends len>(value: T) {
  console.log(value, value.length);
}

// 要求参数上必须要有length属性
Loglen('1234')
Loglen([1,2])
Loglen({length: 5})


// 泛型的好处
// 1.函数和类可以轻松支持多种类型，增强程序的扩展性
// 2.不必写多条函数重载，冗长的联合类型声明，增加代码可读性
// 3.灵活控制类型之间的约束。

