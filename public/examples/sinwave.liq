#! allow Math

height = 15

out = []
for(i = 0, i < height, i++) {
    out.push("")
}

for (i = 0, i < 11.9, i+=0.1) {
    w = Math.sin(i) + 1
    for(j = 0, j < height, j++) {
        if(Math.round(w / height * 100) == j) {
            out[j] += "*"
        } else {
            out[j] += " "
        }
    }
}

console.log(out.join("\n"))
