require 'rubygems'
require 'bundler'

Bundler.require

require 'open-uri'

Sinatra.register SinatraMore::MarkupPlugin
Sinatra.register Sinatra::Twitter::Bootstrap::Assets

set :haml, :format => :html5

get '/' do
  haml :index, :layout => :screen
end
