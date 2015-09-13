class Sighting
  # CONSTANT FOR WINDOWS (in sec)
  VALID_WINDOW = 60
  REASONABLE_WINDOW = 60
  CREDIT_INCR = 1

  def self.get_sighting(params)
    this_service = Service.find(params[:service_id])
    name_symbol = this_service.name.to_sym
    this_stop = Stop.find(params[:stop_id])

    # Hash of all stops that belongs to this service
    # { stop_name: last_seen }
    all_stops_timing = $redis.hget('tracking', name_symbol)
    all_stops_name = this_service.stops.map { |stop| stop.name }

    returnHash[:prev_stops] = get_latest_valid(all_stops_timing, all_stops_name, this_stop)
    returnHash[:this_stop] = elapsed(all_stops_timing[name_symbol])

    returnHash
  end

  def self.post_sighting(params)
    this_service = Service.find(params[:service_id])
    this_stop = Stop.find(params[:stop_id])
    this_user = User.find(params[:user_id])
    status = 'failed'

    service_name_symbol = this_service.name.to_sym
    stop_name_symbol = this_stop.name.to_sym

    User.transaction do
      time_sheet = $redis.hget('tracking', service_name_symbol)
      existing_time = time_sheet[stop_name_symbol]

      # If the time input is legit
      # Update the time sheet hash & push changes to redis
      # Update credit for user
      if legit(existing_time)
        time_sheet[stop_name_symbol] = Time.now
        $redis.hset('tracking', service_name_symbol, time_sheet)

        this_user.credit += CREDIT_INCR
        this_user.save!
        status = 'success'
      end
    end

    return { status: status }
  end

  private

  # Get the latest valid timing from the previous stops (w.r.t. this current stop)
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
    Time.now - time <= VALID_WINDOW
  end

  def legit(time)
    # For now assume users don't post false reports.
    # Only check if the input is reasonable:
    # If it's VALID_WINDOW seconds after the last data then it's legit
    Time.now - time >= REASONABLE_WINDOW
  end

  def elapsed(time)
    Time.now - time
  end
end
