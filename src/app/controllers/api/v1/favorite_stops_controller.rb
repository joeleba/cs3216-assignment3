module Api
  module V1
    class FavoriteStopsController < ApplicationController
      respond_to :json
      before_action :set_stop

      def index
        @favorites = FavoriteStop.where(user_id: current_user.id)
        respond_with @favorites
      end

      def create
        render json: FavoriteStop.create(stop: @stop, user: current_user)
      end

      def destroy
        FavoriteStop.where(stop_id: @stop.id, user_id: current_user.id).first.destroy
        redirect_to @stop, notice: 'Stop no longer in favorites'
      end

      def set_stop
        @stop = Stop.find(params[:stop_id] || params[:id])
      end
    end
  end
end

