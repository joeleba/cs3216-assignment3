# WARNING:
# Params are not finalized. Will need further discussion
# I/O Documentations will be added later
require 'actionpack/action_caching'

module Api
  module V1
    class StopsController < ApplicationController
      respond_to :json
      caches_action :index

      # GET /api/v1/stops
      # Get the list of all stops
      # Return val: array of stop objects
      # [{
      #    "id"         : 2,
      #    "name"       : "pgp",
      #    "longitude"  : null,
      #    "latitude"   : null
      # }]
      def index
        @stops = Stop.all.order(:name)
        respond_with @stops
      end

      # GET /api/v1/stops/:id
      # Get one particular stop based on :id
      # Return val: 1 stop object
      # {
      #   "id"         : 2,
      #   "name"       : "pgp",
      #   "longitude"  : null,
      #   "latitude"   : null
      # }
      def show
        @stop = Stop.find(params[:id])
        respond_with @stop
      end

      # GET /api/v1/stops/:id/services
      # Get the services available at a stop
      # Return val: array of service objects
      # [{
      #   "id"    : 1,
      #   "name"  : "a1"
      #  },
      #  {
      #   "id"    : 2,
      #   "name"  : "a2"
      #  }]
      def services
        @stop = Stop.find(params[:id])
        @services = @stop.services.order(:name)
        respond_with @services
      end
    end
  end
end
