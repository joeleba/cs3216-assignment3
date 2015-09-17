class Location
  def self.get_nearby(params)
    userLocation = [params[:lat], params[:lon]]
    stops_array = []
    get_all_stops_coord.each { |stop_obj|
      stop_array_entry = {}
      stop_array_entry[:stop] = stop_obj[:stop]
      stop_array_entry[:distance] = Geocoder::Calculations.distance_between(userLocation, stop_obj[:coord])*1000
      stops_array.push(stop_array_entry)
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