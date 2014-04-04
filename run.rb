require 'sinatra'
require 'liquidscript'
require 'pygments.rb'
require 'oj'

configure do
  disable :protection
end

post '/run' do
  ast    = params[:type] == "ast"
  tokens = params[:type] == "tokens"
  error  = nil
  output = nil

  begin
    output = Liquidscript.compile(params[:code],
      :ast => ast, :tokens => tokens).to_s
    if ast || tokens
      output = Pygments.highlight(output, :lexer => "lisp")
    else
      output = Pygments.highlight(output, :lexer => "javascript")
    end
  rescue Liquidscript::Error => e
    error = e
  end

  Oj.dump({ "error" => error, "success" => (error == nil), "result" => output })
end
