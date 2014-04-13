#! allow Math

class Shape {
  x: 0
  y: 0

  initialize: (x, y)-> {
    this.x = x
    this.y = y
  }
}

class Circle : Shape {
  r: 0

  initialize: (x, y, r)-> {
    this.x = x
    this.y = y
    this.r = r
  }

  area: -> {
    return Math.PI * Math.pow(this.r, 2)
  }

  # Unit circle.
  this.unit: -> {
    return new Circle(0, 0, 1)
  }
}

console.log(Circle.unit().area())
