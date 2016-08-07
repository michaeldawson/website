Rails.application.routes.draw do
  resources :posts, except: :index

  devise_for :users
  get 'home/index'

  root to: 'home#index'
end
