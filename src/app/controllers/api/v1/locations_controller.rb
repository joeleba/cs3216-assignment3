module Api
  module V1
    class LocationsController < ApplicationController
      respond_to :json

      # GET /api/v1/locations?lat=&lon=
      #
      # Get an array of nearby stops, ranked by distance ASC
      # Params: lat & lon
      # Return value:
      # {
      #   "nearby_stops": [
      #     {
      #       "stop": {
      #         "id": 10,
      #         "name": "COM2",
      #         "longitude": "103.7736903995500000",
      #         "latitude": "1.2943139822027000"
      #       },
      #       "distance": 0.04430261437480384
      #     },
      #     {
      #       "stop": {
      #         "id": 11,
      #         "name": "BIZ2",
      #         "longitude": "103.7751080857900000",
      #         "latitude": "1.2936685240305000"
      #       },
      #       "distance": 0.09140004095787715
      #     },
      #     ...]
      # }
      def nearby
        render json: Location.get_nearby(params)
      end
    end
  end
end
