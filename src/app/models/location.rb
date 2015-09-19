class Location
  def self.get_nearby(params)
    userLocation = [params[:lat], params[:lon]]
    stops_array = []

    # Cache the coordinates of the stops. This is not changing.
    # Rails.cache.fetch does both read and write
    all_stop_coords = Rails.cache.fetch('all_stop_coords') do
      get_all_stops_coord
    end

    all_stop_coords.each { |stop_obj|
      stops_array_entry = {}
      stops_array_entry[:stop] = stop_obj[:stop]
      stops_array_entry[:distance] = (Geocoder::Calculations.distance_between(userLocation, stop_obj[:coord])*1000).round(0)
      stops_array.push(stops_array_entry)
    }
    { nearby_stops: stops_array.sort_by! {|obj| obj[:distance]} }
  end

  private

  def self.get_all_stops_coord
    coords = []
    stops = Stop.all
    stops.each { |stop|
      obj = {}
      obj[:stop] = stop
      obj[:coord] = [stop.latitude, stop.longitude]
      coords.push(obj)
    }
    coords
  end
end