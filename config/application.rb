require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

require 'dotenv'
Dotenv::Railtie.load

module Michael
  class Application < Rails::Application
    config.generators do |g|
      g.test_framework :rspec
    end

    config.assets.paths << Rails.root.join('app/assets/fonts')
  end
end
