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
end