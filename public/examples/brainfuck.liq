#! allow String document setTimeout Math
# A really messy brainfuck interpeter

run-brainfuck = (cmd, tape-length) ->{
  #Create an empty tape with 0's
  tape = (()->{
    a=[]
    for(i = 0, i<tape-length, i++) {
      a.push(0)
    }
    return a
  })()

  #Filter the cmd
  cmd=(()->{
    a=""
    for(c in cmd) {
      if("+-<>.,[]".indexOf(cmd[c]) != -1) {
        a+=cmd[c]
      }
    }
    return a
  })()

  #initialise runtime stuff
  tape-pointer = 0
  c-pointer = 0
  out = ""
  chr = String.fromCharCode
  while(true) {
    if (
     tape-pointer > tape.length
  or tape-pointer < 0 or c-pointer < 0
  or c-pointer > cmd.length - 1
    ) {
      break
    }

    c = cmd[c-pointer]
    if(c == "+" ){tape[tape-pointer]++}
    elsif(c == "-"){tape[tape-pointer]--}
    elsif(c == "<"){tape-pointer--}
    elsif(c == ">"){tape-pointer++}
    elsif(c == "."){out += chr(tape[tape-pointer])}
    elsif(c == ","){} # Not implemented
    elsif(c == "["){
      if(tape[tape-pointer]==0) {
        c=0
        while(1){
          c-pointer++
          if(cmd[c-pointer] == "[")
            {c++}
          elsif(c==0 and cmd[c-pointer] == "]")
            {break}
          elsif(cmd[c-pointer] == "]")
            {c--}
        }
      }
    }
    elsif(c == "]"){
      if(tape[tape-pointer]!=0) {
        c=0
        while(1){
          c-pointer--
          if(cmd[c-pointer] == "]")
            {c++}
          elsif(c==0 and cmd[c-pointer] == "[")
            {break}
          elsif(cmd[c-pointer] == "[")
            {c--}
        }
      }
    }
    c-pointer++
  }
  return out
}

# This code will print hello world
code = "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+."

return run-brainfuck(code, 1000)
