# WARNING:
# Params are not finalized. Will need further discussion
# I/O Documentations will be added later

module Api
  module V1
    class SightingsController < ApplicationController
      respond_to :json

      # GET /api/v1/sighting
      # Get last seen information of a service.
      #
      # Params:
      # {
      #   service_id: ...
      #   stop_id: ...
      # }
      #
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
        respond_with Sighting.get_sighting(params)
      end

      # POST /api/v1/sighting
      # Post a user report
      #
      # Params:
      # {
      #   user_id: ...
      #   service_id: ...
      #   stop_id: ...
      # }
      def post_sighting
      end
    end
  end
end
