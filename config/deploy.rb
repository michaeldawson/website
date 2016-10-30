# config valid only for current version of Capistrano
lock '3.6.1'

set :application, 'michaeldawson'
set :repo_url, 'https://github.com/michaeldawson/website.git'
set :deploy_to, '/var/www/michaeldawson'
set :unicorn_service, -> { "unicorn_#{fetch(:application)}" }
set :rbenv_type, :user
set :rbenv_ruby, File.read('.ruby-version').strip
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w{rake gem bundle ruby rails}
append :linked_files, '.env'


namespace :unicorn do
  %w[start stop restart reload].each do |command|
    Rake::Task["unicorn:#{command}"].clear_actions
    desc "#{command} unicorn"
    task command do
      on roles :app do
        sudo 'service', fetch(:unicorn_service), command
      end
    end
  end
end
