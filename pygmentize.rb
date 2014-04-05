require 'pygments.rb'

thing = $stdin.read

puts Pygments.highlight(thing, :lexer => "coffeescript")
