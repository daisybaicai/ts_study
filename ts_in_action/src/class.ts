import { runInContext } from "vm";

// 类， 为成员属性增加类型注解
class Dog {
  constructor (name: string) {
    this.name = name;
  }
  public name: string
  run() {}
  private pir() {}
  protected pro() {} // 不能在实例中访问，子类中可以
  readonly legs: number = 4 // 只读属性一定要被初始化
  static food: string = 'bones' // 静态成员只能通过类名调用，不能通过子类调用
}

// 类成员的属性都是实例属性，不是原型属性，类成员的方法都是实例方法

console.log(Dog.prototype)
// {run: ƒ, constructor: ƒ}，不包含name属性

let dog = new Dog('wang')
console.log(dog)
// Dog {name: "wang"} ,name只在实例上， 实例属性必须有初始化或者有初始值

// 类的继承
class Husky extends Dog {
  constructor (name: string, color: string) {
    super(name);
    this.color = color;
    // this.pri()
    this.pro()
  }
  color: string
}

// 修饰符, 默认public, 私有只有本身调用，不能在子类中调用

console.log(Dog.food)
// console.log(dog.food)


// 抽象类与多态
abstract class Animal {
  eat() {
    console.log('eat')
  }
  abstract sleep(): void
}

//  抽象类只能被继承，不能被实例化
// let animal = new Animal()

class Cat extends Animal {
  constructor(name: string) {
    super()
    this.name = name;
  }
  name: string
  run() {}
  sleep() {
    console.log('cat sleep')
  }
}

let cat  = new Cat('miao');
cat.eat()
cat.sleep();

class Pig extends Animal {
  sleep() {
    console.log('pig sleep');
  }
}
let pig = new Pig()

// 重载，多态
let animals : Animal[] = [cat, pig]
animals.forEach((i) => {
  i.sleep()
})

class WorkFlow {
  step1() {
    return this;
  }
  step2() {
    return this;
  }
}

new WorkFlow().step1().step2()

class MyFlow extends WorkFlow {
  next() {
    return this;
  }
}

new MyFlow().next().step1().next().step2();