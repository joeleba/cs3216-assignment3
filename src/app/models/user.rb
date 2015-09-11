class User < ActiveRecord::Base
  DEFAULT_CREDIT = 100
  before_create :set_default_credit

  private

  def set_default_credit
    self.credit = DEFAULT_CREDIT
  end
end