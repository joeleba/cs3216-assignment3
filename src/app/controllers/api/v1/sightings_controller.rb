# WARNING:
# Params are not finalized. Will need further discussion
# I/O Documentations will be added later

module Api
  module V1
    class SightingsController < ApplicationController
      respond_to :json

      # GET /api/v1/sightings?service_id=&stop_id=
      # Get last seen information of a service.
      #
      # Return val: an object containing last seen location of a service and
      # the time elapsed since it last left this current stop
      # {
      #   "prev_stops": {
      #     "stop": {
      #       "id": 1,
      #       "name": "PGP Terminal",
      #       "longitude": null,
      #       "latitude": null
      #     },
      #     "last_seen": 2218
      #   },
      #   "this_stop": 1442290502
      # }
      def get_sighting
        render json: Sighting.get_sighting(params)
      end

      # POST /api/v1/sightings
      # Post a user report
      #
      # Params:
      # sighting: {
      #   user_id: ...
      #   service_id: ...
      #   stop_id: ...
      # }
      #
      # Return val:
      # { status: <failed/success> }
      def post_sighting
        render json: Sighting.post_sighting(params[:sighting])
      end
    end
  end
end
