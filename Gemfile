source 'https://rubygems.org'

gem 'rails', '~> 5.0.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'haml-rails'
gem 'devise', '~> 4.2.0'
gem 'nokogiri', '~> 1.6.8'

group :production do
  gem 'mysql2'
  gem 'unicorn'
end

group :development, :test do
  gem 'byebug'
  gem 'sqlite3'
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
