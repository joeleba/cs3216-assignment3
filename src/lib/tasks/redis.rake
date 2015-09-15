# Rake file for redis-related operations
namespace :redis do
  desc "Set up the hash structure on redis"
  task populate: :environment do
    puts "\e[32mCreating Redis bus structure...\e[0m"
    services = Service.all
    services.each { |sv|
      $redis.hset('tracking', sv.id, bus_stops_hash(sv))
      puts "\e[32mDone with service #{sv.name}.\e[0m"
    }
    puts "\e[32mAll done!\e[0m"
    puts "\e[32mRun \e[33m$redis.hgetall('tracking')\e[0m \e[32min rails console to view the structure.\e[0m"
  end

  desc "Clear all existing data in current redis db"
  task clear: :environment do
    puts "\e[32mClearing all existing data in current redis db...\e[0m"
    $redis.flushdb
  end

  desc "Clear all existing data then set up hash structure on Redis"
  task setup: [:clear, :populate]

  # Create a hash in the format:
  # {
  #   <stop_id> : {
  #     name : <stop_name>,
  #     last_seen : <time> // Default as ''
  #   }
  # }
  # '' will be replaced with actual timing later on (when users post reports to server)
  def bus_stops_hash(service)
    stops = service.stops
    tracking_hash = {}
    stops.each { |s|
      tracking_hash[s.id] = {
        name: s.name,
        last_seen: ''
      }
    }
    tracking_hash
  end
end