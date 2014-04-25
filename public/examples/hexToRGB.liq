:[allow parseInt document]

hex-to-rgb = (hex)-> {
  out = [
    parse-int(hex.slice(1, 3), 16),
    parse-int(hex.slice(3, 5), 16),
    parse-int(hex.slice(5, 7), 16)
  ]

  return "rgb(#{out[0]}, #{out[1]}, #{out[2]})"
}

console.log(hex-to-rgb("#00ffff"))
console.log(hex-to-rgb("#ff00ff"))
console.log(hex-to-rgb("#88A6CF"))
console.log(hex-to-rgb("#123456"))
