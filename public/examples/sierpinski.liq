sierpinski = (size)-> {
  size = 1 << size
  out  = ""
  for(y = size - 1, y >= 0, y--) {
    for(i = 0, i < y, i++)
      out += " "

    for(x = 0, x + y < size, x++) {
      if(x & y) {
        out += " "
      } else {
        out += "*"
      }
    }
    out += "\n"
  }
  return out
}

return sierpinski(4)
