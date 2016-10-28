namespace :unicorn do
  %w[start stop restart reload].each do |command|
    desc "#{command} unicorn"
    task command do
      on roles :app do
        puts "Running sudo (apparently)"
        sudo 'service', fetch(:unicorn_service), command
      end
    end
  end
end
