module Api
  module V1
    class FavoriteStopsController < ApplicationController
      respond_to :json
      before_action :set_stop

      def index
        @favorites = FavoriteStop.where(user_id: current_user.id)
        @favorite_stops = @favorites.map { |f| f.stop }
        respond_with @favorite_stops
      end

      def create
        @favorite_stop = FavoriteStop.create(stop: @stop, user: current_user)
        respond_with({status: :favorited, stop: @stop})
      end

      def destroy
        FavoriteStop.where(stop_id: @stop.id, user_id: current_user.id).first.destroy
        respond_with({status: :deleted})
      end

      def set_stop
        @stop = Stop.find(params[:stop_id] || params[:id])
      end
    end
  end
end

