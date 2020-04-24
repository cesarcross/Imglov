# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user, only: %i[index current]

      # def index
      #   render status: 200, json: {  messsage: 'User logged in'}
      # end

      def create
        @user = User.new(user_params)
        render status: 201, json: { messsage: 'User was created' } if @user.save
      end

      def current
        current_user.update!(last_login: Time.now)
        render json: current_user
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
      end
    end
  end
end
