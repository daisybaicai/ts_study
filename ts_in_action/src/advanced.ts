import { type } from "os";

// 类型检查机制

// 定义：ts编译器在做类型检查时，所秉承的一些原则，以及表现出的一些行为。
// 作用： 辅助开发，提高开发效率。

//1.类型推断 2.类型兼容性 3.类型保护

// 1. 类型判断
// 不需要指定变量的类型（函数的返回值类型），ts可以根据某些规则自动地为其推断出一个类型

// -基础类型推断，-最佳通用类型推断， -上下文类型推断

// -基础类型推断（从右到左表达式推断）

// 设置值以后，发现已经推断为对应的类型
let a = 1;
let b = [1];

let c = (x = 1) => x + 1

// -最佳通用类型推断（从右到左表达式推断）
// 多个类型中推断出类型时，ts会推断出尽量满足当前所有类型的兼容类型
let d = [1, null]

//  -上下文类型推断（从左到右推断）
// 通常发生在事件处理中

window.onkeydown = (event) => {
  // console.log(event.button)
}

// 类型断言
interface Foo {
  bar: number
}
let foo = {} as Foo
foo.bar = 1
//建议，声明时就指定类型
let foo2: Foo = { bar: 1 }

// 类型断言避免滥用

//2.类型兼容性
// 当一个类型Y可以被赋值给另一个类型X，我们就可以说类型X兼容类型Y

// X兼容Y： X（目标类型） = Y（源类型）

let s: string = 'a'
// s = null

// 接口兼容性
interface X {
  a: any;
  b: any;
}

interface Y {
  a: any;
  b: any;
  c: any;
}


let x: X = { a: 1, b: 2 }
let y: Y = { a: 1, b: 2, c: 3 }

// x可以赋值给y，y不能赋值给x，再次体现了鸭式变形法，
// 源类型必须有目标属性的必要属性，成员少的兼容成员多的
x = y
// y = x

// 函数兼容性
type Handler = (a: number, b: number) => void
function hot(handler: Handler) {
  return handler
}

// 1)参数个数 , 目标函数参数个数大于源类型
let handler1 = (a: number) => { }
hot(handler1)
let handler2 = (a: number, b: number, c: number) => { }
// hot(handler2) 不行

// 可选参数和剩余参数
let a1 = (p1: number, p2: number) => { }
let b2 = (p1?: number, p2?: number) => { }
let c3 = (...args: number[]) => { }

// a1 = b2
// a1 = c3
// b2 = a1(no)
// b2 = c3(no)
// c3 = a1
// c3 = b2 

// 2)参数类型
let handler3 = (a: string) => { }
// hot(handler3) 不兼容

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}

let p3d = (point: Point3D) => { }
let p2d = (point: Point2D) => { }

// 成员个数多的能兼容成员个数少的
p3d = p2d
// p2d = p3d(no)

//3) 返回值类型
let f1 = () => ({ name: 'a' })
let g3 = () => ({ name: 'a', location: 'beijing' })
// 少的能兼容多的
f1 = g3
// g3 = f1(no)

function overload(a: number, b: number): number;
function overload(a: string, b: string): string;
function overload(a: any, b: any): any { };

// 枚举的兼容性
enum Fruit { Apple, Banana }
enum Color { Red, Yellow }

let fruit: Fruit.Apple = 3
let no: number = Fruit.Apple
// 枚举之间不能相互赋值
// let color: Color.red = Fruit.Apple (no)

// 类兼容性
class A {
  constructor(p: number, q: number) { }
  id: number = 1
  // private name: string = ''
}

class B {
  static s = 1
  constructor(p: number) { }
  id: number = 2
  // private name: string = ''
}

let aa = new A(1, 2);
let bb = new B(1);

//  两个实例相互兼容， 都具有实例属性id，可以，构造函数和静态成员是不作为比较的, 如果有私有成员那么不能相互赋值
// aa = bb;
// bb = aa;

class C2 extends A { }
let cc = new C2(1, 2)
aa = cc
cc = aa


// 泛型兼容性
interface Empty<T> {

}

let obj1: Empty<number> = {}
let obj3: Empty<string> = {}
obj1 = obj3

let log11 = <T>(x: T): T => {
  console.log(x)
  return x;
}

let log22 = <U>(y: U): U => {
  console.log(y)
  return y;
}

log11 = log22

// 结构之间，成员少的兼容成员多的
// 函数之间，参数多的兼容参数少的

//3. 类型保护

enum Type { Strong, Week }

class Java {
  helloJava() {
    console.log('Hello Java');
  }
  java: any
}

class JavaScript {
  helloJavaScript() {
    console.log('Hello Javascript');
  }
  javascript: any
}

// 自定义保护函数
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined
}

function getLanguage(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java : new JavaScript()


  // if((lang as Java).helloJava) {
  //   (lang as Java).helloJava()
  // } else {
  //   (lang as JavaScript).helloJavaScript()
  // }

  // instanceof 
  // if(lang instanceof Java) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }

  //in
  // if('java' in lang) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }


  //typeof
  // if(typeof x === 'string') {
  //   x.length
  // } else {
  //   x.toFixed(2)
  // }

  // if(isJava(lang)) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }
  return lang
}

getLanguage(Type.Strong, 3);

// 类型保护(instanceof,in,typeof，自定义保护函数)
// ts能够在特定的区块中保证便利那归属于某种确定的类型
// 可以在此区块中放心地引用此类型的属性，或者调用此类型的方法

// 交叉类型(取并集)
interface DogInterface {
  run(): void
}

interface CatInterface {
  jump(): void
}

let pet: DogInterface & CatInterface = {
  run(){ },
  jump(){ }
}


// 联合类型(多个类型之一)
let a3: number | string = 'a'

// 自变量类型（不仅限定类型，还要取值范围）
let b3: 'a' | 'b' | 'c' 
let c4: 1| 2 | 3

class Dog implements DogInterface {
  run() {}
  eat() {}
}

class Cat implements CatInterface {
  jump() {}
  eat() {}
}

enum Master {Boy , Girl}
function getPet(master: Master) {
  let pet = master === Master.Boy ? new Dog() : new Cat()
  // 当一个对象是联合类型时，就只能访问他们的共有成员
  pet.eat()
  return pet
}


interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle",
  r: number
}

type Shape = Square | Rectangle | Circle
function area(s: Shape) {
    switch(s.kind) {
      case "square":
        return s.size*s.size
      case "rectangle":
        return s.height * s.width;
      case "circle": 
        return Math.PI * s.r **2
      default:
        return ((e: never) => {throw new Error(e)})(s)
    }
}

console.log(area({kind: "circle", r:1}))

//两种方法
//1.给定返回值，就会检查没有的
// 2.default: never，看看是否走到这个分支，有遗漏就会走到

// 索引类型
let obj4 = {
  a: 1,
  b: 2,
  c: 3 
}

function getValues(obj: any, keys: string[]) {
  return keys.map(key => obj[key])
}

console.log(getValues(obj4, ['a', 'b']))
// console.log(getValues(obj4, ['e', 'f'])) undefined， undefined

// keyof T (类型T所有公共属性的自变量的联合类型)
interface Obj {
  a: number,
  b: string
}

let key: keyof Obj // "a" | "b"

// 索引访问操作符 T[K] 对象T的属性K所代表的类型
let value: Obj['a'] // number

// T extends U 泛型约束，继承获得某些属性

// 索引类型改造
function getValues2<T, K extends keyof T>(obj: T, keys: K[]): T[K] [] {
  return keys.map(key => obj[key])
}

console.log(getValues2(obj4, ['a', 'b']))
// console.log(getValues2(obj4, ['e', 'f']))(no)

// 映射类型
interface Obj5 {
  a: string;
  b: number;
  c: boolean;
}

type ReadonlyObj = Readonly<Obj>

/**
 * Make all properties in T readonly
 */
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// };

// 可索引的泛型接口，
// 索引签名是  [P in keyof T]
// keyof T 类型T的所有联合类型
// P in 执行过了一次for in操作
//  T[P]：对象T的属性P所代表的类型

type PartialObj = Partial<Obj>

// 配置映射类型
type PickObj = Pick<Obj, 'a' | 'b'>
/**
 * From T, pick a set of properties whose keys are in the union K
 */
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };

// 只在obj上以上三种

type RecordObj = Record<'x' | 'y', Obj>

// 条件类型
// T extends U ? X: Y
type TypeName<T> =
 T extends string? "string":
 T extends number? "number":
 T extends boolean? "boolean":
 T extends undefined? "undefined":
 T extends Function? "function":
 "object";

 type T1 = TypeName<string>
type T2 = TypeName<String []>

//分布式条件类型
// (A|B) : extends U ? X : Y
// (A extends U ? X: Y) | (B extends U ? X : Y)

type T3 = TypeName<string | String []>
type Diff<T, U> = T extends U ? never : T

type T4 = Diff<"a"| "b" | "c", "a" | "e">
// Diff<"a", "a" | "e"> | Diff<"b", "a" | "e"> | Diff<"c", "a"| "e">
// never | "b" | "c"
// "b" | "c"

type NotNull<T> = Diff<T, undefined| null>
type T5 = NotNull<string | number | undefined | null>

// Exclude<T, U>
// NotNull<T>
// Extract<T, U>

type T6 = Extract<"a"| "b" | "C" , "a" |"e">

// ReturnType<T>
type T7 = ReturnType<() => string>

/**
 * Obtain the return type of a function type
 */
// type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

// T 可以被赋值给一个函数，这个函数参数任意，返回值也是任意的
// 由于返回值不确定，infer 延时推断
// 如果是R,返回R 否则any
