# frozen_string_literal: true

Rails.application.routes.draw do
  resources :s3_uploads, only: :set_s3_direct_post

  namespace 'api' do
    namespace 'v1' do
      resources :galleries
      resources :users, only: %i[index create]
    end
  end

  # get login token from knock
  post 'user_token', to: 'user_token#create'
  get 'auth', to: 'home#auth'
  get '/api/v1/users/current', to: 'users#current'
end
