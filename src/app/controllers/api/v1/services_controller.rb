module Api
  module V1
    class ServicesController < ApplicationController
      respond_to :json

      # GET /api/services
      def index
      end

      # GET /api/services/:id
      def show
      end

      # GET /api/services/:id/stops
      def stops
      end
    end
  end
end
