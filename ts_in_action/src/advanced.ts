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

let c = ( x = 1 ) => x + 1

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
let foo2 : Foo = {bar: 1}

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


let x: X = {a: 1, b: 2}
let y: Y = {a: 1, b: 2, c:3}

// x可以赋值给y，y不能赋值给x，再次体现了鸭式变形法，
// 源类型必须有目标属性的必要属性，成员少的兼容成员多的
x = y
// y = x

// 函数兼容性
type Handler = (a: number, b:number) => void
function hot(handler: Handler) {
  return handler
}

// 1)参数个数 , 目标函数参数个数大于源类型
let handler1 = (a: number) => {}
hot(handler1)
let handler2 = (a:number, b:number, c: number) => {}
// hot(handler2) 不行

// 可选参数和剩余参数
let a1 = (p1: number, p2: number) => {}
let b2 = (p1?: number, p2?: number) => {}
let c3 = (...args: number[]) => {}

// a1 = b2
// a1 = c3
// b2 = a1(no)
// b2 = c3(no)
// c3 = a1
// c3 = b2 

// 2)参数类型
let handler3 = (a:string) => {}
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

let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}

// 成员个数多的能兼容成员个数少的
p3d = p2d
// p2d = p3d(no)

//3) 返回值类型
let f1 = () => ({name: 'a'})
let g3 = () => ({name: 'a', location: 'beijing'})
// 少的能兼容多的
f1 = g3
// g3 = f1(no)

function overload(a: number, b: number) : number;
function overload(a: string, b: string) : string;
function overload(a: any, b: any) : any{};

// 枚举的兼容性
enum Fruit {Apple, Banana}
enum Color {Red, Yellow}

let fruit: Fruit.Apple = 3
let no: number = Fruit.Apple
// 枚举之间不能相互赋值
// let color: Color.red = Fruit.Apple (no)

// 类兼容性
class A {
  constructor(p: number, q: number) {}
  id: number = 1
  // private name: string = ''
}

class B {
  static s = 1
  constructor(p: number) {}
  id: number = 2
  // private name: string = ''
}

let aa = new A(1, 2);
let bb = new B(1);

//  两个实例相互兼容， 都具有实例属性id，可以，构造函数和静态成员是不作为比较的, 如果有私有成员那么不能相互赋值
// aa = bb;
// bb = aa;

class C2 extends A {}
let cc = new C2(1,2)
aa = cc
cc = aa


// 泛型兼容性
interface Empty<T> {

}

let obj1: Empty<number> = {}
let obj3: Empty<string> = {}
obj1 = obj3

let log11 = <T>(x: T) : T => {
  console.log(x)
  return x;
}

let log22 = <U>(y: U) : U => {
  console.log(y)
  return y;
}

log11 = log22

// 结构之间，成员少的兼容成员多的
// 函数之间，参数多的兼容参数少的

//3. 类型保护

enum Type {Strong, Week}

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
function isJava(lang: Java | JavaScript):lang is Java {
  return (lang as Java).helloJava !== undefined
}

function getLanguage(type: Type, x: string | number) {
  let lang = type === Type.Strong? new Java: new JavaScript()


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

