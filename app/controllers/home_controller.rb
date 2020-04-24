class HomeController < ApplicationController
  before_action :authenticate_user, only: %i[auth]

  def index
    render json: { service: 'auth-api', status: 200 }
  end

  def auth
    render json: { status: 200, msg: "You are currently logged in as #{current_user.name}" }
  end
end