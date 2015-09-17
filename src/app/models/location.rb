class Location
  def self.get_nearby(params)
    userLocation = [params[:lat], params[:lon]]
    stops_array = []
    get_all_stops_coord.each { |stop_obj|
      stop_array_entry = {}
      stop_array_entry[:name] = stop_obj[:name]
      stop_array_entry[:distance] = Geocoder::Calculations.distance_between(userLocation, stop_obj[:coord])
      stops_array.push(stop_array_entry)
    }
    stops_array.sort_by! {|obj| obj[:distance]}
  end

  private

  def self.get_all_stops_coord
    coords = []
    stops = Stops.all
    stops.each { |stop|
      obj = {}
      obj[:name] = stop.name
      obj[:coord] = [stop.latitude, stop.longitude]
      coords.push(obj)
    }
    coords
  end
end