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