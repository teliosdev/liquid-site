:[allow Math]

out = []
for(i = 0, i < 14, i++) {
  out.push("")
}

for(i = 0, i < 10, i+=0.1) {
  w = Math.sin(i) + 1
  for(j = 0, j < 14, j++) {
    if(Math.round(w / 15 * 100) == j) {
      out[j] += "*"
    } else {
      out[j] += " "
    }
  }
}

console.log(out.join("\n"))
