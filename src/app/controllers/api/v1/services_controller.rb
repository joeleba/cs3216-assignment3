# WARNING:
# Params are not finalized. Will need further discussion
# I/O Documentations will be added later

module Api
  module V1
    class ServicesController < ApplicationController
      respond_to :json

      # GET /api/services
      # List all services
      # Return val: array of service objects
      # [{
      #   "id"    : 1,
      #   "name"  : "a1"
      #  },
      #  {
      #   "id"    : 2,
      #   "name"  : "a2"
      #  }]
      def index
        @services = Service.all
        respond_with @services
      end

      # GET /api/services/:id
      # Get a particular service by :id
      # Return val: service object
      # {
      #   "id"    : 1,
      #   "name"  : "a1"
      # }
      def show
        @service = Service.find(params[:id])
        respond_with @service
      end

      # GET /api/services/:id/stops
      # Get the stops of a particular service
      # Return val: array of stops objects
      # [{
      #    "id"         : 2,
      #    "name"       : "pgp",
      #    "longitude"  : null,
      #    "latitude"   : null
      # }]
      def stops
        @service = Service.find(params[:id])
        @stops = @service.stops

        respond_with @stops
      end

      # GET /api/services/:id/sighting
      # Get last seen information of a service.
      # Return val: an object containing last seen location of a service and
      # the time elapsed since it last left this current stop
      # {
      #   prev_stops: {
      #     stop: <name>
      #     last_seen: <time>
      #   },
      #   this_stop: <time>
      # }
      def get_sighting
        @service = Service.find(params[:id])
        respond_with @service.get_sighting(params[:stop_id])
      end

      # POST /api/services/:id/sighting
      # Post a user report
      def post_sighting
      end
    end
  end
end
