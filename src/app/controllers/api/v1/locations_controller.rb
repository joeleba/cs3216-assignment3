# WARNING:
# Params are not finalized. Will need further discussion
# I/O Documentations will be added later

module Api
  module V1
    class LocationsController < ApplicationController
      respond_to :json

      # GET /api/v1/locations?lat=&lon=
      # Get last seen information of a service.
      def nearby
        render json: Location.get_nearby(params)
      end
    end
  end
end
