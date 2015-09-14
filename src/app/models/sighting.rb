class Sighting
  # CONSTANT FOR WINDOWS (in sec)
  VALID_WINDOW = 60
  REASONABLE_WINDOW = 60
  CREDIT_INCR = 1

  # Logic for getting sighting from redis
  # > Identify a service
  # > Identify current stop
  # > Get the list of stops of service
  # > From the list, check if a prev bus stop (w.r.t. current stop) has a valid timing
  #   - Valid timing is defined below
  # > Also get the last seen timing of that service at this current stop
  #
  # Warning: the returnHash will have null value if no result is found
  def self.get_sighting(params)
    this_service = Service.find(params[:service_id])
    name_symbol = this_service.name.to_sym
    this_stop = Stop.find(params[:stop_id])

    # Hash of all stops that belongs to this service
    # all_stops_timing = { stop_name: last_seen }
    all_stops_timing = $redis.hget('tracking', name_symbol)
    all_stops = this_service.stops

    returnHash[:prev_stops] = get_latest_valid(all_stops_timing, all_stops_name, this_stop)
    returnHash[:this_stop] = elapsed(all_stops_timing[name_symbol])

    returnHash
  end

  # Logic for handling user report
  # > Identify this_service, this_stop and this_user
  # > Make a transaction:
  #   - Get list of current sightings of aforementioned this_service
  #   - From the list, get the current sighting detail at this_stop
  #   - If the reported sighting is legit (defined below) as compared to the existing one
  #     = Update redis time sheet
  #     = Add credit for user
  #
  # Return: { status: <failed/success> }
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
  def get_latest_valid(stops_timings, stops, this_stop)
    pos = stops.find_index(this_stop)

    # If the stop is the terminal: iteration starts from the penultimate stop
    ite_start = pos == 0 ? (stops_timings.length - 1) : (pos - 1)

    for i in ite_start..0
      last_data = stops_timings[stops[i].name]
      if still_valid(last_data)
        return {
          stop: stops[i],
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
