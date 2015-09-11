module Api
  module V1
    class UsersController < ApplicationController
      respond_to :json

      # GET /api/users/:id
      def show
      end

      # POST /api/users
      def create
      end

      # GET /api/users/:id/credit
      def get_credit
      end

      # PUT /api/users/:id/credit
      def update_credit
      end

      # DELETE /api/users/:id
      def destroy
      end
    end
  end
end
