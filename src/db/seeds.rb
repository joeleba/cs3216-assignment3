# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

services_and_stops = [
  {
    service: 'A1',
    stops: ['PGP Terminal', 'KR MRT', 'LT29', 'University Hall', 'Opp. UHC', 'YIH', 'CLB',
            'LT13', 'AS7', 'COM2', 'BIZ2', 'Opp. House 12', 'House 7']
  },
  {
    service: 'A2',
    stops: ['PGP Terminal', 'Btwn House 14 & 15', 'House 12', 'Opp. Hon Sui Sen Mem. Lib.',
            'Opp. NUSS', 'COM2', 'Ventus (Opp. LT 13)', 'Comp. Cen.', 'Opp. YIH', 'Museum',
            'UHC', 'Opp. University Hall', 'Blk S17', 'Opp. KR MRT', 'PGPR']
  },
  {
    service: 'B',
    stops: ['']
  },
  {
    service: 'C',
    stops: ['']
  },
  {
    service: 'D1 (To BIZ2)',
    stops: ['']
  },
  {
    service: 'D1 (To UT)',
    stops: ['']
  },
  {
    service: 'D2',
    stops: ['']
  },
  {
    service: 'CLB-UT',
    stops: ['']
  },
  {
    service: 'FoS-UT',
    stops: ['']
  },
  {
    service: 'A1E',
    stops: ['']
  },
  {
    service: 'A2E (AM)',
    stops: ['']
  },
  {
    service: 'A2E (PM)',
    stops: ['']
  }
]

def save_stop_ine(service, name)
  stop = Stop.where(name: name)[0]
  if !stop
    service.stops.create(name: name)
  else
    service.stops << stop
    service.save!
  end
end