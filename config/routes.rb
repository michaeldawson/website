Rails.application.routes.draw do
  root to: 'posts#index'
  resources :posts

  devise_for :users, skip: [:sessions, :registrations, :passwords, :unlocks]
  as :user do
    get 'login' => 'sessions#new', as: :new_user_session
    post 'login' => 'sessions#create', as: :user_session
    match 'logout' => 'sessions#destroy', as: :destroy_user_session, via: Devise.mappings[:user].sign_out_via
  end
end
