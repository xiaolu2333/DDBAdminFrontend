# 一，定义类

定义类的方式有两种，一种是类声明，另一种是类表达式。

## 1.1 类声明

类声明的一般形式如下：

```js
class 类名 {
    // 类体
}
```

一个具体的例子：

```js
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}
```

## 1.2 类表达式

类表达式的一般形式如下：

```js
let 类名 = class {
    // 类体
}
```

实际上就是匿名的类赋值给一个变量，这个变量名就是类名。
如果命名了类表达式，那么类名只能在类内部使用，外部使用会报错。

```js
// 未命名/匿名类
let Rectangle = class {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};
console.log(Rectangle.name);
// output: "Rectangle"

// 命名类
let Rectangle = class Rectangle2 {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};
console.log(Rectangle.name);
// 输出："Rectangle2"

console.log(Rectangle2.name);
// ReferenceError: Rectangle2 is not defined
```

# 二，类体和方法定义

类体是一对花括号，里面包含类的数据、方法、构造函数等，它们统称为类成员。

## 2.1 构造函数

类的构造函数，用于创建和初始化类的一个对象，必须使用 `new` 调用。

- 一个类只能拥有一个名为 “constructor” 的特殊方法。如果类包含多个constructor的方法，则将抛出 一个`SyntaxError `。

我们会在构造函数中初始化类的属性，这些属性会被赋值给类的实例对象。其中使用 `this` 关键字来引用类的实例对象。

```js
class Polygon {
    constructor() {
        this.name = 'Polygon';
    }
}

const poly1 = new Polygon();

console.log(poly1.name);
// Expected output: "Polygon"
```

如果不指定构造方法，则使用默认构造函数。对于基类，默认构造函数是：

```js
constructor()
{
}
```

## 2.2 原型方法

类的原型方法，是定义在类的原型对象上的方法，它们会被类的所有实例对象继承。

```js
class Rectangle {
    // constructor
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    // Getter
    get area() {
        return this.calcArea();
    }

    // Method
    calcArea() {
        return this.height * this.width;
    }
}

const square = new Rectangle(10, 10);

console.log(square.height);
// 10

console.log(square.hasOwnProperty('area'));
console.log(square.area);
console.log(square.hasOwnProperty('area'));
// 100
```

在上面的例子中，我们定义了一个 `Rectangle` 类:

- 它有一个构造器，用于初始化类的实例对象，完成两个参数 `height` 和 `width` 的赋值。
- 它有六个原型方法。

getter 注释下的 `get` 语法将对象属性绑定到查询该属性时将被调用的函数。
setter 注释下的 `set` 语法将对象属性绑定到要调用的函数以设置属性。

## 2.3 静态方法

`static` 关键字用来定义一个类的一个静态方法。

- 静态方法是属于类的，而不是属于类的实例。这意味着静态方法可以被类本身调用，而无需创建类的实例。静态方法通常用于执行与类本身相关，而不是与类实例相关的操作。

静态方法通常用于为一个应用程序创建工具函数：

- `Math.sqrt()`  方法返回一个数字的平方根。
- `String.fromCharCode()`  方法返回一个字符串，该字符串由给定的 Unicode 字符码表示。
- `Array.isArray()`  方法返回一个值是否为数组。

举个例子：
```js
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.hypot(dx, dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.distance;
// undefined

console.log(Point.displayName);
// "Point"
console.log(Point.distance(p1, p2));
// 7.0710678118654755
```

# 三，类的继承
## 3.1 extends 关键字
`extends` 关键字在类声明或类表达式中用于创建一个类作为另一个类的一个子类。
```js
class ChildClass extends ParentClass { ... }
```
举个例子：
```js
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name); // 调用超类构造函数并传入 name 参数
    }

    speak() {
        console.log(`${this.name} barks.`);
    }
}

var d = new Dog("Mitzie");
d.speak(); // 'Mitzie barks.'
```

## 3.2 单继承
一个类只能继承自另一个类，无法同时继承多个类。但是可以通过多级继承来继承多个类。
```js
// 动物
class Animal { ... }
// 哺乳动物
class Mammal extends Animal { ... }
// 人类
class Human extends Mammal { ... }
```

## 3.3 super 关键字
`super` 关键字用于访问对象字面量或类的原型上的属性，或调用父类的构造函数。

举个例子：
```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // 调用超类构造函数并传入 name 参数
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

var d = new Dog("Mitzie");
d.speak(); // 'Mitzie barks.'
```

# 四，面向对象编程的基本概念
## 4.1 类的继承

类的继承是面向对象编程的一个基本概念。继承是指一个类继承另一个类的特性，这使得子类能够重用父类的代码，而不需要重新编写它。在 JavaScript 中，类的继承是通过原型链实现的。

## 4.2 类的多态

多态是指同一个方法可以在不同的对象上有不同的行为。在面向对象编程中，多态性是指可以将父类对象的引用指向子类对象，程序会根据引用指向的子类对象的类型，动态调用子类对象的同名方法。

## 4.3 类的封装

封装是指将数据和操作数据的方法绑定在一起，对数据的访问只能通过已定义的接口。在面向对象编程中，类通过暴露有限的接口来实现封装。

## 4.4 类的抽象

抽象是指隐藏方法的具体实现，使得我们只关心方法的行为。在面向对象编程中，类通过抽象隐藏了数据和操作数据的方法，使得我们不需要关心数据的具体实现，只需要关心数据的行为。




