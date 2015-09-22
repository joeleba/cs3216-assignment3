class User < ActiveRecord::Base
  DEFAULT_CREDIT = 100
  TITLE_MAPPING = {0 => 'Recruit', 10 => 'Minion', 50 => 'Apprentice', 150 => 'Journeyman',
                   400 => 'Adept', 800 => 'Bus Hunter', 1500 => 'Bus Stalker', 2500 => 'Bus Overlord',
                   4000 => 'Bus Lord', 6000 => 'Omnibus'}
  before_create :set_default_credit

  enum title: ['Recruit', 'Minion', 'Apprentice', 'Journeyman', 'Adept',
               'Bus Hunter', 'Bus Stalker', 'Bus Overload', 'Bus Lord',
               'Omnibus']

  def update_credit(amount)
    self.credit = amount
    update_title(credit)
  end

  def update_title(credit)
    TITLE_MAPPING.each do |points, new_title|
      self.title = credit.to_i > points ? new_title : title
    end
  end

  private

  def set_default_credit
    self.credit = DEFAULT_CREDIT
  end

  def self.from_omniauth(auth)
    User.where(provider: auth.provider, uid: auth.uid).first_or_initialize do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end
end
