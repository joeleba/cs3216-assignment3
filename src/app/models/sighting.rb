require 'active_support'
class Sighting
  # CONSTANT FOR WINDOWS (in sec)
  VALID_WINDOW = 300
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
    this_stop = Stop.find(params[:stop_id])
    returnHash = {}

    # Hash of all stops that belongs to this service
    # all_stops_timing = { stop_id: {name: <>, last_seen: <>}, ... }
    all_stops_timing = eval($redis.hget('tracking', this_service.id))
    all_stops = this_service.stops

    returnHash[:prev_stops] = get_latest_valid(all_stops_timing, all_stops, this_stop)
    returnHash[:this_stop] = elapsed(all_stops_timing[this_stop.id][:last_seen])

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
    params = ActiveSupport::JSON.decode(params)
    this_service = Service.find(params['service_id'])
    this_stop = Stop.find(params['stop_id'])
    this_user = User.find(params['user_id'])
    status = 'failed'

    User.transaction do
      time_sheet = eval($redis.hget('tracking', this_service.id))
      existing_time = time_sheet[this_stop.id][:last_seen]

      # If the time input is legit
      # Update the time sheet hash & push changes to redis
      # Update credit for user
      # Time is saved as timestamp
      if is_legit(existing_time)
        time_sheet[this_stop.id][:last_seen] = Time.now.to_i
        $redis.hset('tracking', this_service.id, time_sheet)

        this_user.credit += CREDIT_INCR
        this_user.save!
        status = 'success'
      end
    end

    return { status: status }
  end

  private

  # Get the latest valid timing from the previous stops (w.r.t. this current stop)
  def self.get_latest_valid(stops_timings, stops, this_stop)
    pos = stops.find_index(this_stop)
    return_val = {
      stop: '',
      last_seen: ''
    }
    # If the stop is the terminal: iteration starts from the penultimate stop
    ite = pos == 0 ? (stops.length - 1) : (pos - 1)

    while ite >= 0
      last_data = stops_timings[stops[ite].id][:last_seen]
      if still_valid(last_data)
        return_val[:stop] = stops[ite]
        return_val[:last_seen] = elapsed(last_data)
        break
      end
      ite -= 1
    end

    return_val
  end

  def self.still_valid(time)
    Time.now.to_i - time.to_i <= VALID_WINDOW
  end

  def self.is_legit(time)
    # For now assume users don't post false reports.
    # Only check if the input is reasonable:
    # If it's VALID_WINDOW seconds after the last data then it's legit
    return true if time === ''
    Time.now.to_i - time.to_i >= REASONABLE_WINDOW
  end

  def self.elapsed(time)
    return 'No data :(' if time === ''
    Time.now.to_i - time.to_i
  end
end
