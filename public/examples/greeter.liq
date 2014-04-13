class Greeter {
  initialize: (name)-> this.name = name

  greet: -> console.log("Hello #{this.name}!")

  this.meet: (first, second)-> {
    new Greeter(first).greet()
    new Greeter(second).greet()
  }
}

Greeter.meet("Alice", "Bob")
