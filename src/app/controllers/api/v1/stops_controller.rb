# WARNING:
# Params are not finalized. Will need further discussion
# I/O Documentations will be added later

module Api
  module V1
    class StopsController < ApplicationController
      respond_to :json

      # GET /api/stops
      def index
        @stops = Stop.all
        respond_with @stops
      end

      # GET /api/stops/:id
      def show
        @stop = Stop.find(params[:id])
        respond_with @stop
      end

      # GET /api/stops/:id/services
      def services
        @stop = Stop.find(params[:id])
        @services = @stop.services
        respond_with @services
      end
    end
  end
end
