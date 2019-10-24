// 数字枚举
enum Role {
  Repoter = 1,
  Develpoer,
  Maintainer,
  Owner,
  Guest
}

// 取值从0开始，也可以自定义初始值。后面会相应递增。
// 枚举很像对象，还多了其他成员，名字，索引都可以来读
// 反向映射，枚举实现的原理/
/* 
var Role;
(function (Role) {
    Role[Role["Repoter"] = 1] = "Repoter";
    Role[Role["Develpoer"] = 2] = "Develpoer";
    Role[Role["Maintainer"] = 3] = "Maintainer";
    Role[Role["Owner"] = 4] = "Owner";
    Role[Role["Guest"] = 5] = "Guest";
})(Role || (Role = {}));
*/

console.log(Role.Repoter)

// 字符串枚举 , 不能通过索引访问，只能通过对应的key
enum Message {
  Success = '成功',
  Fail = '失败'
}

console.log(Message.Success)

// 异构枚举
// 混合使用，不建议
enum Answer {
  N,
  Y = 'yes'
}

// 0 "yes" "N" undefined
console.log(Answer.N,Answer.Y,Answer[0],Answer[1])

// 枚举成员，只读不可修改
// Role.Repoter = 2  

enum Char {
  //const 计算出结果，常量给计算机
  a,
  b = Char.a,
  c = 1 + 3,
  // computed
  d = Math.random(),
  e = '123'.length
}

/**
var Char;
(function (Char) {
    //const 计算出结果，常量给计算机
    Char[Char["a"] = 0] = "a";
    Char[Char["b"] = 0] = "b";
    Char[Char["c"] = 4] = "c";
    // computed
    Char[Char["d"] = Math.random()] = "d";
    Char[Char["e"] = '123'.length] = "e";
})(Char || (Char = {}));
 */

 // computed 后面的需要都要被赋值

 //  常量赋值，只需要一个值，不需要一个对象时
 const enum Month {
   Jan,
   Feb,
   Mar,
 }

 let month = [Month.Jan, Month.Feb, Month.Mar]
 // 在编译时就会变成常量，会非常简洁。
 //var month = [0 /* Jan */, 1 /* Feb */, 2 /* Mar */];


 // 枚举类型
 enum E { a, b }
 enum F { a = 0, b = 1}
 enum G { a= 'apple', b = 'banana'}

 let e: E = 3
 let f: F = 3
 
// e === f //不能比较

let e1: E.a = 1
let e2: E.b 
// e1 === e2 不同的不能比较
let e3: E.a = 1
// e1 === e3 相同的可以比较

// 字符串 取值只能是枚举成员的类型
let g1: G = G.b
let g2: G.a = G.a // 只能G.a,自身


// 程序中的不容易记忆的硬编码以及未来中经常会改变的常量，抽取出来，定义成枚举类型。


