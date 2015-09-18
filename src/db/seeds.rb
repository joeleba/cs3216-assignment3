# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

services_and_stops = [
  {
    name: 'A1',
    stops: [{name: 'PGP Terminal', longitude: '103.7804949540100000', latitude: '1.2919256943123000'},
            {name: 'KR MRT', longitude: '103.7849210000000000', latitude: '1.2936680000000000'},
            {name: 'LT29', longitude: '103.7810920000000000', latitude: '1.2973590000000000'},
            {name: 'U Hall', longitude: '103.7787329547930600', latitude: '1.2971604522020967'},
            {name: 'Opp. UHC', longitude: '103.7755640000000000', latitude: '1.2987660000000000'},
            {name: 'YIH', longitude: '103.7742760000000000', latitude: '1.2986670000000000'},
            {name: 'CLB', longitude: '103.7725430000000000', latitude: '1.2965130000000000'},
            {name: 'LT13', longitude: '103.7706449546002900', latitude: '1.2945886967726710'},
            {name: 'AS7', longitude: '103.7720125177797200', latitude: '1.2934648958163953'},
            {name: 'COM2', longitude: '103.7736903995500000', latitude: '1.2943139822027000'},
            {name: 'BIZ2', longitude: '103.7751080857900000', latitude: '1.2936685240305000'},
            {name: 'Opp. Hse 12', longitude: '103.7772924895500000', latitude: '1.2937199340425000'},
            {name: 'House 7', longitude: '103.7779805420300000', latitude: '1.2933090582670000'}]
  },
  {
    name: 'A2',
    stops: [{name: 'PGP Terminal', longitude: '103.7804949540100000', latitude: '1.2919256943123000'},
            {name: 'Btwn Hse 14 & 15', longitude: '103.7779056448900000', latitude: '1.2930153180155000'},
            {name: 'House 12', longitude: '103.7771674911300000', latitude: '1.2935856087691000'},
            {name: 'Opp. HSSML', longitude: '103.775070', latitude: '1.292996'},
            {name: 'Opp. NUSS', longitude: '103.772478', latitude: '1.293370'},
            {name: 'COM2', longitude: '103.7736903995500000', latitude: '1.2943139822027000'},
            {name: 'Ventus', longitude: '103.7706549545700000', latitude: '1.2956382610565000'},
            {name: 'Comp. Cen.', longitude: '103.7727580000000000', latitude: '1.2974720000000000'},
            {name: 'Opp. YIH', longitude: '103.7741510000000000', latitude: '1.2989920000000000'},
            {name: 'Museum', longitude: '103.7737270000000000', latitude: '1.3011720000000000'},
            {name: 'UHC', longitude: '103.7759890000000000', latitude: '1.2989260000000000'},
            {name: 'Opp. U Hall', longitude: '103.7779823878809000', latitude: '1.2975544899533398'},
            {name: 'Blk S17', longitude: '103.7814260000000000', latitude: '1.2974930000000000'},
            {name: 'Opp. KR MRT', longitude: '103.7850630000000000', latitude: '1.2941130000000000'},
            {name: 'PGPR', longitude: '103.781174', latitude: '1.290972'}]
  },
  {
    name: 'B',
    stops: [{name: 'KR Bus Terminal', longitude: '103.7696501294700000', latitude: '1.2946755187001000'},
            {name: 'Japanese Pri Sch', longitude: '103.7698808354900000', latitude: '1.3007901663760000'},
            {name: 'Museum', longitude: '103.7737270000000000', latitude: '1.3011720000000000'},
            {name: 'YIH', longitude: '103.7742760000000000', latitude: '1.2986670000000000'},
            {name: 'CLB', longitude: '103.7725430000000000', latitude: '1.2965130000000000'},
            {name: 'LT13', longitude: '103.7706449546002900', latitude: '1.2945886967726710'},
            {name: 'AS7', longitude: '103.7720125177797200', latitude: '1.2934648958163953'},
            {name: 'COM2', longitude: '103.7736903995500000', latitude: '1.2943139822027000'},
            {name: 'Ventus', longitude: '103.7706549545700000', latitude: '1.2956382610565000'},
            {name: 'Comp. Cen.', longitude: '103.7727580000000000', latitude: '1.2974720000000000'},
            {name: 'Opp. YIH', longitude: '103.7741510000000000', latitude: '1.2989920000000000'},
            {name: 'Raffles Hall', longitude: '103.7733500000000000', latitude: '1.3009000000000000'},
            {name: 'Fac. of Engg.', longitude: '103.7701330000000000', latitude: '1.3005730000000000'},
            {name: 'KR Bus Terminal', longitude: '103.7696501294700000', latitude: '1.2946755187001000'}]
  },
  {
    name: 'C',
    stops: [{name: 'KR Bus Terminal', longitude: '103.7696501294700000', latitude: '1.2946755187001000'},
            {name: 'Japanese Pri Sch', longitude: '103.7698808354900000', latitude: '1.3007901663760000'},
            {name: 'Museum', longitude: '103.7737270000000000', latitude: '1.3011720000000000'},
            {name: 'UHC', longitude: '103.7759890000000000', latitude: '1.2989260000000000'},
            {name: 'Opp. U Hall', longitude: '103.7779823878809000', latitude: '1.2975544899533398'},
            {name: 'Blk S17', longitude: '103.7814260000000000', latitude: '1.2974930000000000'},
            {name: 'LT29', longitude: '103.7810920000000000', latitude: '1.2973590000000000'},
            {name: 'U Hall', longitude: '103.7787329547930600', latitude: '1.2971604522020967'},
            {name: 'Opp. UHC', longitude: '103.7755640000000000', latitude: '1.2987660000000000'},
            {name: 'Raffles Hall', longitude: '103.7733500000000000', latitude: '1.3009000000000000'},
            {name: 'Fac. of Engg.', longitude: '103.7701330000000000', latitude: '1.3005730000000000'},
            {name: 'KR Bus Terminal', longitude: '103.7696501294700000', latitude: '1.2946755187001000'}]
  },
  {
    name: 'D1 (To BIZ2)',
    stops: [{name: 'UTown CREATE', longitude: '103.7747695170442600', latitude: '1.3037038207119909'},
            {name: 'Museum', longitude: '103.7737270000000000', latitude: '1.3011720000000000'},
            {name: 'YIH', longitude: '103.7742760000000000', latitude: '1.2986670000000000'},
            {name: 'CLB', longitude: '103.7725430000000000', latitude: '1.2965130000000000'},
            {name: 'LT13', longitude: '103.7706449546002900', latitude: '1.2945886967726710'},
            {name: 'AS7', longitude: '103.7720125177797200', latitude: '1.2934648958163953'},
            {name: 'COM2', longitude: '103.7736903995500000', latitude: '1.2943139822027000'},
            {name: 'BIZ2', longitude: '103.7751080857900000', latitude: '1.2936685240305000'}
    ]
  },
  {
    name: 'D1 (To UT)',
    stops: [{name: 'Opp. HSSML', longitude: '103.775070', latitude: '1.292996'},
            {name: 'Opp. NUSS', longitude: '103.772478', latitude: '1.293370'},
            {name: 'COM2', longitude: '103.7736903995500000', latitude: '1.2943139822027000'},
            {name: 'Ventus', longitude: '103.7706549545700000', latitude: '1.2956382610565000'},
            {name: 'Comp. Cen.', longitude: '103.7727580000000000', latitude: '1.2974720000000000'},
            {name: 'Opp. YIH', longitude: '103.7741510000000000', latitude: '1.2989920000000000'},
            {name: 'UTown CREATE', longitude: '103.7747695170442600', latitude: '1.3037038207119909'}]
  },
  {
    name: 'D2',
    stops: [{name: 'PGP Terminal', longitude: '103.7804949540100000', latitude: '1.2919256943123000'},
            {name: 'KR MRT', longitude: '103.7849210000000000', latitude: '1.2936680000000000'},
            {name: 'LT29', longitude: '103.7810920000000000', latitude: '1.2973590000000000'},
            {name: 'U Hall', longitude: '103.7787329547930600', latitude: '1.2971604522020967'},
            {name: 'Opp. UHC', longitude: '103.7755640000000000', latitude: '1.2987660000000000'},
            {name: 'Museum', longitude: '103.7737270000000000', latitude: '1.3011720000000000'},
            {name: 'UTown CREATE', longitude: '103.7747695170442600', latitude: '1.3037038207119909'},
            {name: 'UHC', longitude: '103.7759890000000000', latitude: '1.2989260000000000'},
            {name: 'Opp. U Hall', longitude: '103.7779823878809000', latitude: '1.2975544899533398'},
            {name: 'Blk S17', longitude: '103.7814260000000000', latitude: '1.2974930000000000'},
            {name: 'Opp. KR MRT', longitude: '103.7850630000000000', latitude: '1.2941130000000000'},
            {name: 'PGPR', longitude: '103.781174', latitude: '1.290972'},
            {name: 'BIZ2 Terminal', longitude: '103.7804949540100000', latitude: '1.2919256943123000'}]
  },
  {
    name: 'A1E',
    stops: [{name: 'KR MRT', longitude: '103.7849210000000000', latitude: '1.2936680000000000'},
            {name: 'LT29', longitude: '103.7810920000000000', latitude: '1.2973590000000000'},
            {name: 'CLB', longitude: '103.7725430000000000', latitude: '1.2965130000000000'},
            {name: 'BIZ2', longitude: '103.7751080857900000', latitude: '1.2936685240305000'},
            {name: 'PGP Terminal', longitude: '103.7804949540100000', latitude: '1.2919256943123000'}]
  },
  {
    name: 'A2E (AM)',
    stops: [{name: 'Opp. KR MRT', longitude: '103.7850630000000000', latitude: '1.2941130000000000'},
            {name: 'Ventus', longitude: '103.7706549545700000', latitude: '1.2956382610565000'},
            {name: 'Comp. Cen.', longitude: '103.7727580000000000', latitude: '1.2974720000000000'},
            {name: 'Blk S17', longitude: '103.7814260000000000', latitude: '1.2974930000000000'},
            {name: 'Opp. KR MRT', longitude: '103.7850630000000000', latitude: '1.2941130000000000'}
    ]
  },
  {
    name: 'A2E (PM)',
    stops: [{name: 'Ventus', longitude: '103.7706549545700000', latitude: '1.2956382610565000'},
            {name: 'Comp. Cen.', longitude: '103.7727580000000000', latitude: '1.2974720000000000'},
            {name: 'Blk S17', longitude: '103.7814260000000000', latitude: '1.2974930000000000'},
            {name: 'Opp. KR MRT', longitude: '103.7850630000000000', latitude: '1.2941130000000000'},
            {name: 'Ventus', longitude: '103.7706549545700000', latitude: '1.2956382610565000'}]
  }
]

def save_stop_ine(service, stop_obj)
  stop = Stop.where(name: stop_obj[:name])[0]
  if !stop
    service.stops.create(name: stop_obj[:name], longitude: stop_obj[:longitude], latitude: stop_obj[:latitude])
  else
    service.stops << stop
    service.save!
  end
end

services_and_stops.each {|obj|
  new_service = Service.create(name: obj[:name])
  obj[:stops].each { |stop_obj|
    save_stop_ine(new_service, stop_obj)
  }
  puts "\e[32mFinished seeding #{obj[:name]}\e[0m"
}
