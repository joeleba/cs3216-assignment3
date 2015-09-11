module Api
  module V1
    class StopsController < ApplicationController
      respond_to :json

      # GET /api/stops
      def index
      end

      # GET /api/stops/:id
      def show
      end

      # GET /api/stops/:id/services
      def services
      end
    end
  end
end
