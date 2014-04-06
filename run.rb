require 'sinatra'
require 'liquidscript'
require 'pygments.rb'
require 'oj'

configure do
  disable :protection
end

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

options '/run' do; end

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
    error = e.message
  end

  content_type 'application/json'
  Oj.dump({ "error" => error, "success" => (error == nil), "result" => output }, :object)
end

post '/exec.js' do
  ast    = params[:type] == "ast"
  tokens = params[:type] == "tokens"

  begin
    output = Liquidscript.compile(params[:code],
      :ast => ast, :tokens => tokens).to_s
  rescue Liquidscript::Error => e
    status 400
    return e.message
  end

  content_type 'application/javascript'
  output
end
