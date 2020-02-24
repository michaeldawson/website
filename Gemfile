source 'https://rubygems.org'

gem 'rails', '~> 5.2.1'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'haml-rails'
gem 'devise', '~> 4.5.0'
gem 'nokogiri', '~> 1.10.8'
gem 'pg'
gem 'unicorn'

group :production do
  gem 'rails_12factor'
end

group :development, :test do
  gem 'byebug'
end

group :development do
  gem 'overcommit', require: false
  gem 'reek', require: false
  gem 'rubocop', require: false
  gem 'haml_lint', require: false
  gem 'scss_lint', require: false
  gem 'listen'
end

group :test do
  gem 'rspec-rails'
  gem 'capybara'
end
