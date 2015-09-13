class Service < ActiveRecord::Base
  # CONSTANT FOR VALID WINDOWS (in sec)
  VALID_WINDOW = 10

  has_and_belongs_to_many :stops

  def get_sighting(stop_id)
    name_symbol = self.name.to_sym
    this_stop = Stop.find(stop_id)

    # Hash of all stops that belongs to this service
    # { stop_name: last_seen }
    all_stops_timing = $redis.hget('tracking', name_symbol)
    all_stops_name = self.stops.map { |stop| stop.name }

    returnHash[:prev_stops] = get_latest_valid(all_stops_timing, all_stops_name, this_stop)
    returnHash[:this_stop] = elapsed(all_stops_timing[name_symbol])

    returnHash
  end

  private

  def get_latest_valid(stops_timings, stops_names, this_stop)
    pos = stops_names.find_index(this_stop.name)

    for i in (pos-1)..0
      last_data = stops_timings[stops_names[i]]
      if still_valid(last_data)
        return {
          stop: stops_names[i],
          last_seen: elapsed(last_data)
        }
      end
    end
  end

  def still_valid(time)
    Time.now() - time <= VALID_WINDOW
  end

  def elapsed(time)
    Time.now() - time
  end

end
