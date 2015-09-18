redis_yml = File.join(Rails.root,'config','redis.yml')
raise "#{redis_yml} is missing!" unless File.exists? redis_yml
redis_conf = YAML.load_file(redis_yml)[Rails.env].symbolize_keys

# Redis initializer
$redis = Redis.new(:host => redis_conf[:host], :port => redis_conf[:port])

