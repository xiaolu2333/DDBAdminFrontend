
// 定义Animal接口
class Animal {
  walk() {
    throw new Error('Method not implemented');
  }

  eat() {
    throw new Error('Method not implemented');
  }

  sleep() {
    throw new Error('Method not implemented');
  }
}

// 将Animal接口拆分为多个小的接口
class Walkable {
  walk() {
    throw new Error('Method not implemented');
  }
}

class Eatable {
  eat() {
    throw new Error('Method not implemented');
  }
}

class Sleepable {
  sleep() {
    throw new Error('Method not implemented');
  }
}

// 实现Animal接口
class Dog extends Animal {
  walk() {
    console.log('Dog is walking');
  }

  eat() {
    console.log('Dog is eating');
  }

  sleep() {
    console.log('Dog is sleeping');
  }
}

// 实现Walkable接口
class Cat extends Walkable {
  walk() {
    console.log('Cat is walking');
  }
}

// 实现Eatable接口
class Cow extends Eatable {
  eat() {
    console.log('Cow is eating');
  }
}

// 实现Sleepable接口
class Sheep extends Sleepable {
  sleep() {
    console.log('Sheep is sleeping');
  }
}

// 使用Dog、Cat、Cow和Sheep类
const dog = new Dog();
dog.walk();
dog.eat();
dog.sleep();

const cat = new Cat();
cat.walk();

const cow = new Cow();
cow.eat();

const sheep = new Sheep();
sheep.sleep();
