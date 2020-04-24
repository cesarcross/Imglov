# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
ruby '2.7.0'
gem 'active_model_serializers', '~> 0.10.7'
gem 'aws-sdk', '~> 2'
gem 'bcrypt', '~> 3.1', '>= 3.1.12'
gem 'bootsnap', '>= 1.1.0', require: false
gem 'jbuilder', '~> 2.7'
gem 'jwt', '~> 1.5', '>= 1.5.6'
gem 'knock', '~> 2.1', '>= 2.1.1'
gem 'mini_magick', '~> 4.8'
gem 'paperclip', '~> 6.0'
gem 'pg'
gem 'puma', '~> 4.3.3'
gem 'rack-attack', '~> 5.2'
gem 'rack-cors', '~> 1.0', '>= 1.0.2'
gem 'rails', '~> 6.0.2.2'
group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'faker'
  gem 'pry'
  gem 'pry-byebug'
end
group :test do
  gem 'database_cleaner', '~> 1.7'
  gem 'factory_bot_rails', '~> 4.10'
  gem 'rails-controller-testing'
  gem 'rspec-rails', '~> 3.7', '>= 3.7.2'
  gem 'shoulda-matchers', '~> 3.1', '>= 3.1.2'
  gem 'simplecov', require: false
end
group :development do
  gem 'foreman'
  gem 'listen', '>= 3.0.5'
  gem 'spring'
  gem 'spring-commands-rspec', '~> 1.0', '>= 1.0.4'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end
# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
