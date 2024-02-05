# 一，设计模式原则

## 1，S – Single Responsibility Principle 单一职责原则

一个程序只做好一件事
如果功能过于复杂就拆分开，每个部分保持独立

单一职责原则（Single Responsibility Principle，SRP）是面向对象设计中的一个原则，它指出一个类应该只有一个引起变化的原因。

在JavaScript中，我们可以通过以下示例来说明单一职责原则：
假设我们有一个名为 `User` 的类，用于表示用户对象。根据单一职责原则， `User` 类应该只负责用户相关的功能，比如用户的登录、注册和个人信息管理等。我们可以将这些功能拆分为不同的方法或者子类来实现：
```javascript

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    login() {
        // 处理用户登录逻辑
    }

    register() {
        // 处理用户注册逻辑
    }

    updateProfile() {
        // 处理用户个人信息更新逻辑
    }
}

// 使用User类
const user = new User('john_doe', 'password123');
user.login();
user.updateProfile();
```
上述示例的好处是，当某个功能需要修改时，我们只需要关注与该功能相关的方法或者子类，而不会影响到其他功能的实现。

通过遵守单一职责原则，我们可以使代码更加可维护、可扩展和易于理解。当一个类只负责一种功能时，代码的职责清晰，逻辑更加简洁，也更容易进行测试和重构。



## 2，O – OpenClosed Principle 开放/封闭原则

对扩展开放，对修改封闭
增加需求时，扩展新代码，而非修改已有代码

开放/封闭原则（Open/Closed Principle，OCP）是面向对象设计中的另一个重要原则，它指出软件实体（类、模块、函数等）应该对扩展开放，对修改关闭。

在JavaScript中，我们可以通过以下示例来说明开放/封闭原则：
假设我们有一个名为 `Calculator` 的类，用于计算各种数学运算。根据开放/封闭原则， `Calculator` 类应该对扩展开放，这意味着我们可以通过添加新的计算方法来扩展它的功能，而无需修改现有代码。我们可以通过使用继承或组合的方式来实现这一点：
```javascript
class Calculator {
    constructor() {
        this.operations = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b
        };
    }

    calculate(operation, a, b) {
        if (!this.operations[operation]) {
            throw new Error('Invalid operation');
        }

        return this.operations[operation](a, b);
    }
}

// 使用Calculator类
const calculator = new Calculator();
const result = calculator.calculate('+', 10, 20);
console.log(result); // 输出：30

// 扩展Calculator类，添加新的计算方法
class AdvancedCalculator extends Calculator {
    constructor() {
        super();

        this.operations['^'] = (a, b) => Math.pow(a, b);
        this.operations['%'] = (a, b) => a % b;
    }
}

// 使用AdvancedCalculator类
const advancedCalculator = new AdvancedCalculator();
const result2 = advancedCalculator.calculate('^', 2, 3);
console.log(result2); // 输出：8
const result3 = advancedCalculator.calculate('%', 10, 3);
console.log(result3); // 输出：1
```
在上述示例中，我们可以通过继承或组合的方式来扩展它的功能，而无需修改现有代码。这样做的好处是，当我们需要添加新的计算方法时，我们只需要扩展 `Calculator` 类，而不会影响到现有代码的运行。

通过遵守开放/封闭原则，我们可以使代码更加灵活、可扩展和易于维护。当软件实体对扩展开放时，我们可以轻松地添加新的功能，而无需修改现有代码。这使得代码更加灵活，也更容易进行重构和维护。



## 3，L – Liskov Substitution Principle 里氏替换原则

子类能覆盖父类
父类能出现的地方子类就能出现

里氏替换原则（Liskov Substitution Principle，LSP）是面向对象设计中的另一个重要原则，它指出子类对象可以替换父类对象，并且不会影响程序的正确性。

在JavaScript中，我们可以通过以下示例来说明里氏替换原则：
假设我们有一个名为 `Shape` 的抽象类，用于表示各种形状。根据里氏替换原则， `Shape` 类的子类应该可以替换 `Shape` 类对象，并且不会影响程序的正确性。我们可以通过以下示例来说明这一点：
```javascript
class Shape {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super(width, height);
  }
}

class Square extends Shape {
  constructor(side) {
    super(side, side);
  }
}

// 使用Shape、Rectangle和Square类
const shape = new Shape(10, 20);
const rectangle = new Rectangle(10, 20);
const square = new Square(10);

console.log(shape.getArea()); // 输出：200
console.log(rectangle.getArea()); // 输出：200
console.log(square.getArea()); // 输出：100
```
在上述示例中， `Rectangle` 和 `Square` 类都是 `Shape` 类的子类，它们都实现了 `getArea()` 方法。当我们使用 `Shape` 类对象时，我们可以使用 `Rectangle` 或 `Square` 类对象来替换它，而不会影响程序的正确性。这样做的好处是，我们可以根据需要使用不同的子类对象，而无需修改现有代码。


## 4，I – Interface Segregation Principle 接口隔离原则

保持接口的单一独立
类似单一职责原则，这里更关注接口

接口隔离原则（Interface Segregation Principle，ISP）是面向对象设计中的一个原则，它指出一个类不应该依赖于它不需要的接口。

在JavaScript中，我们可以通过以下示例来说明接口隔离原则：
假设我们有一个名为 `Animal` 的接口，用于表示各种动物。根据接口隔离原则，我们应该将 `Animal` 接口拆分为多个小的接口，每个接口只包含必要的方法。这样做的好处是，当我们使用某个类时，我们只需要实现与该类相关的接口方法，而不会影响到其他方法的实现。
```javascript
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
```
在上述示例中，我们将 `Animal` 接口拆分为 `Walkable` 、 `Eatable` 和 `Sleepable` 三个小的接口，每个接口只包含必要的方法。当我们使用 `Dog` 、 `Cat` 、 `Cow` 和 `Sheep` 类时，我们只需要实现与该类相关的接口方法，而不会影响到其他方法的实现。

通过遵守接口隔离原则，我们可以使代码更加灵活、可扩展和易于维护。当一个类只依赖于它需要的接口时，我们可以轻松地添加、修改或删除接口方法，而不会影响到其他方法的实现。这使得代码更加灵活，也更容易进行重构和维护。


## 5，D – Dependency Inversion Principle 依赖倒转原则

面向接口编程，依赖于抽象而不依赖于具体
使用方只关注接口而不关注具体类的实现


# 二，设计模式分类
设计模式可以分为以下几个主要分类：

1. 创建型模式（Creational Patterns）：这些模式关注对象的创建过程，包括实例化对象的方式、对象的组合方式以及隐藏对象的创建细节。一些常见的创建型模式包括工厂模式、抽象工厂模式、单例模式、建造者模式和原型模式。

2. 结构型模式（Structural Patterns）：这些模式关注对象之间的组合方式，以便形成更大的结构，同时保持结构的灵活性。结构型模式帮助我们将类或对象组合成更大的结构，以满足特定的需求。一些常见的结构型模式包括适配器模式、装饰器模式、代理模式、组合模式、外观模式、桥接模式和享元模式。

3. 行为型模式（Behavioral Patterns）：这些模式关注对象之间的通信和协作方式，以实现更灵活、可扩展和可维护的系统。行为型模式涉及到对象之间的交互和职责分配。一些常见的行为型模式包括观察者模式、策略模式、模板方法模式、命令模式、迭代器模式、状态模式、职责链模式和访问者模式。

4. J2EE模式（J2EE Patterns）：这些模式是特定于Java企业版（Java Enterprise Edition，J2EE）的设计模式，用于解决企业级应用程序开发中的常见问题。J2EE模式包括MVC模式、业务代表模式、数据访问对象模式、前端控制器模式等。

这些是设计模式的主要分类，每个分类都包含多个具体的设计模式。每个设计模式都有其独特的用途和适用场景，可以帮助我们解决特定类型的问题，并提供可重用的解决方案。


# 三，设计模式——创建型模式

## 1，工厂模式（Factory Pattern）

工厂模式（Factory Pattern）是一种创建型设计模式，用于封装对象的实例化过程。它提供了一种统一的接口来创建对象，而不需要直接使用构造函数。

适用场景：
- 当我们需要根据不同的条件创建不同类型的对象时，工厂模式非常有用。它可以根据条件动态地创建对象，而无需暴露对象的具体实现细节。
- 当我们希望通过使用工厂方法来解耦对象的创建和使用时，工厂模式也是一种常见的选择。

详细JavaScript代码说明：
可以使用同一个工厂类来创建不同类型的产品对象。为了实现这一点，我们可以在工厂类中添加适当的逻辑来根据不同的条件返回不同类型的产品对象。

以下是一个示例：
```javascript
// 创建基础的产品类
class Product {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

// 创建工厂类来创建产品对象
class ProductFactory {
  createProduct(type, name) {
    switch (type) {
      case 'A':
        return new ProductA(name);
      case 'B':
        return new ProductB(name);
      default:
        throw new Error('Invalid product type');
    }
  }
}

// 具体的产品类
class ProductA extends Product {
  // ...
}

class ProductB extends Product {
  // ...
}

// 使用工厂类创建不同类型的产品对象
const factory = new ProductFactory();
const productA = factory.createProduct('A', 'Product A');
console.log(productA.getName()); // 输出：Product A

const productB = factory.createProduct('B', 'Product B');
console.log(productB.getName()); // 输出：Product B
```
在上述示例中，工厂类 `ProductFactory` 的 `createProduct` 方法接受一个类型参数和一个名称参数。根据传入的类型参数，工厂类可以创建不同类型的产品对象。在 `switch` 语句中，我们根据类型参数来决定创建哪种类型的产品对象。根据需要，可以添加更多的 `case` 来支持更多类型的产品。

优点：
- **工厂模式将对象的创建过程封装在工厂类**中，使客户端代码与具体对象的实现解耦。客户端只需要与工厂类进行交互，而不需要直接实例化对象。
- 工厂模式提供了一种可扩展的方式来创建对象。通过添加新的具体工厂类，我们可以轻松地添加新的产品类型，而无需修改现有代码。

缺点：
- 工厂模式增加了代码的复杂性，因为我们需要创建工厂类和产品类。这对于简单的对象创建可能会显得繁琐。
- 如果产品类的构造函数参数很多或者构造过程很复杂，工厂模式可能会变得复杂和冗长。

注意事项：
- 在使用工厂模式时，我们需要明确定义产品类和工厂类之间的接口，以确保工厂类能够正确地创建产品对象。
- 工厂模式可以与其他设计模式结合使用，例如单例模式、抽象工厂模式等，以满足特定的需求。

总结：
工厂模式是一种常见的设计模式，用于封装对象的实例化过程。它提供了一种统一的接口来创建对象，使客户端代码与具体对象的实现解耦。通过使用工厂模式，我们可以实现灵活、可扩展和可维护的代码结构。


