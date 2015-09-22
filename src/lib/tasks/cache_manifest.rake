task :cache_manifest => ['deploy:precompile_assets', 'html5_manifest']

task :html5_manifest => :environment do
  puts "\e[34mCreating manifest.appcache...\e[0m"

  File.open("public/manifest.appcache", "w") do |f|
    f.write("CACHE MANIFEST\n")
    f.write("# Version #{Time.now.to_i}\n\n")
    f.write("CACHE:\n")
    assets = Dir.glob(File.join(Rails.root, 'public/assets/**/*'))
    assets.each do |asset|
      if File.extname(asset) != '.gz' && File.extname(asset) != '' && File.extname(asset) != '.json'
        filename_path = /#{Rails.root.to_s}\/public\/(assets\/.*)/.match(File.absolute_path(asset))[1].to_s
        f.write(filename_path.concat("\n"))
      end
    end
    f.write("\nNETWORK:\n")
    f.write("*\n")
  end
  puts "\e[32mManifest file created at public/manifest.appcache\e[0m"
end

namespace :deploy do
  task :precompile_assets do
    require 'fileutils'
    if File.directory?("#{Rails.root.to_s}/public/assets")
      FileUtils.rm_r "#{Rails.root.to_s}/public/assets"
    end

    puts "\e[34mPrecompiling assets...\e[0m"
    puts `RAILS_ENV=production bundle exec rake assets:precompile`
    puts "\e[32mDone.\e[0m"
  end
end
