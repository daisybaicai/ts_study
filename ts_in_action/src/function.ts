// 函数定义
// 函数，参数给出对应类型，返回值可以通过类型推断得出
function add1(x: number, y: number) {
  return x + y 
}

// let add2: (x: number, y: number) => number

type add3 = (x: number, y: number) => number

interface add4 {
  (x: number, y: number): number
}

// 形参和实参需要一一对应,多了少了也不行
add1(1,2)

// 可选参数,可选参数必须位于必选参数之后
function add52(x: number, y?: number) {
  return y? x+y : x;
}

add52(1)

// 在必选参数前，可选参数不可以被省略
function add6(x: number, y = 0, z:number, q = 1) {
  return x + y + z + q; 
}

console.log(add6(1, undefined, 3))

// 参数不确定，使用剩余参数
function add7 (x:number, ...rest: number[]) {
  return x+ rest.reduce((pre, cur) => pre+ cur)
}

console.log(add7(1,2,3,4,5))

// 函数重载, ts处理时查询重载的列表，从上往下找，把使用频率高的放在前面

function add8 (...rest : number[]) : number;
function add8 (...rest : string[]) : string;
function add8 (...rest : any[]) : any {
  let first = rest[0];
  if (typeof first === 'string') {
    return rest.join('')
  }
  if (typeof first === 'number') {
    return rest.reduce((pre, cur) => pre + cur);
  }
}

console.log(add8(1,2,3))
console.log(add8('date','2','date'))
