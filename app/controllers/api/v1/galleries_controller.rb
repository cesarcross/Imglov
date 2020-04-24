module Api
  module V1
    class GalleriesController < ApplicationController
      before_action :set_gallery, only: %i(show update destroy)
      before_action :set_user, only: %i(create update destroy)
      before_action :authenticate_user, only: %i(create update destroy)

      # GET /galleries.json
      def index
        @galleries = Gallery.all
        render json: @galleries
      end

      # GET /galleries/1.json
      def show
        render json: @gallery
      end

      # POST /galleries.json
      def create
        if @user
          @gallery = @user.galleries.new(gallery_params)
          if @gallery.save
            render json: @gallery, status: :created, location: @gallery
          else
            render json: @gallery.errors, status: :unprocessable_entity
          end
        # else
        #   render status: 401, json: { message: 'Unauthorized' }
        end
      end

      # PATCH/PUT /galleries/1.json
      def update
        if @user && @user.id == @gallery.user.id
          if @gallery.update(gallery_params)
            render json: @gallery, status: 200
          else
            render json: @gallery.errors, status: :unprocessable_entity
          end
        # else
        #   render json: { status: 401, msg: 'Unauthorized' }
        end
      end

      # DELETE /galleries/1.json
      def destroy
        if @user && @user.id == @gallery.user.id
          @gallery.destroy
          render status: 204, json: { message: 'Item successfully deleted' }
        else
          render status: 401, json: { message: 'Unauthorized' }
        end
      end

      # FIXME gallery creation fails without this
      def gallery_url(arg)
      end

      private
        def set_gallery
          @gallery = Gallery.find(params[:id])
        end

        def set_user
          if current_user
            @user = User.find(current_user.id)
          end
        end

        def gallery_params
          params.require(:gallery).permit(
            [
              :title,
              images_attributes: %i(id file)
            ]
          )
        end
    end
  end
end