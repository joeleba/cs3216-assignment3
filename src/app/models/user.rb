class User < ActiveRecord::Base
  DEFAULT_CREDIT = 100
  before_create :set_default_credit

  def update_credit(amount)
    credit = amount
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
