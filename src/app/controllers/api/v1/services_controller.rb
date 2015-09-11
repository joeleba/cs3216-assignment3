# WARNING:
# Params are not finalized. Will need further discussion
# I/O Documentations will be added later

module Api
  module V1
    class ServicesController < ApplicationController
      respond_to :json

      # GET /api/services
      def index
        @services = Service.all
        respond_with @services
      end

      # GET /api/services/:id
      def show
        @service = Service.find(params[:id])
        respond_with @service
      end

      # GET /api/services/:id/stops
      def stops
        @service = Service.find(params[:id])
        @stops = @services.stops

        respond_with @stops
      end
    end
  end
end
