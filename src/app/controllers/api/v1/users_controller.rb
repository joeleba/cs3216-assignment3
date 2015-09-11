# WARNING:
# Params are not finalized. Will need further discussion
# Documentations will be added later

module Api
  module V1
    class UsersController < ApplicationController
      respond_to :json

      # GET /api/users/:id
      def show
        respond_with User.find(params[:id])
      end

      # POST /api/users
      def create
        User.transaction do
          @user = User.new(create_params)
          @user.save!
        end

        respond_with @user
      end

      # PUT /api/users/:id/credit
      def update_credit
        User.transaction do
          @user = User.find(params[:id])
          @user.update_credit(params[:user][:credit])
          @user.save!
        end

        respond_with @user
      end

      # DELETE /api/users/:id
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
