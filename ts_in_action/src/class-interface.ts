interface Human {
  name: string;
  eat(): void;
}

// 类实现接口时，必须实现所有属性, 接口只能约束类的公有成员
class Asian implements Human {
  constructor(name: string) {
    this.name = name;
  }
  name: string
  eat() {}
  sleep() {}
}

interface Man extends Human {
  run(): void
}

interface Child {
  cry(): void
}
// 接口可以继承接口
interface Boy extends Man, Child {}

let bog: Boy = {
  name: '',
  run() {},
  eat() {},
  cry() {}
}

class Auto {
  state = 1 
  private state2 = 0
}

interface AutoInterface extends Auto {

}

class C implements AutoInterface {
  state = 1
}

class Bus extends Auto implements AutoInterface {

}