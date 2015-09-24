module Api
  module V1
    class UsersController < ApplicationController
      respond_to :json

      # GET /api/v1/users
      def index
        respond_with User.all.limit(20).order(credit: :desc)
      end

      # GET /api/v1/users/:id
      def show
        respond_with User.find(params[:id])
      end

      # POST /api/v1/users
      def create
        User.transaction do
          @user = User.new(create_params)
          @user.save!
        end

        respond_with @user
      end

      # PUT /api/v1/users/:id/credit
      def update_credit
        User.transaction do
          @user = User.find(params[:id])
          @user.update_credit(params[:user][:credit])
          @user.save!
        end

        respond_with @user
      end

      # DELETE /api/v1/users/:id
      def destroy
        @user = User.find(params[:id])
        @user.destroy!

        respond_with({status: :deleted})
      end

      private

      def create_params
        return nil unless params[:user]

        permit = [:fb_id, :access_token]
        params.require(:user).permit(permit)
      end
    end
  end
end
