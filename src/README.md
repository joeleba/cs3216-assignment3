# NexBus

## How to set up:
1. Install gems: `bundle install`
2. Install front-end packages: `bundle exec rake bower:install`
3. Setup database: `bundle exec rake db:setup`
4. Run server: `bundle exec rails s`

## Set up Redis
For Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis

For Mac OS X:

1. Install Homebrew: http://brew.sh/
2. Install redis using homebrew: brew install redis
3. Link the plist for launch agents: ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents
4. Unload from launch control: launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
5. Load again: launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

To create a redis hash structure that fits our particular purpose, run `rake redis:setup`

The app will run at localhost:3000
