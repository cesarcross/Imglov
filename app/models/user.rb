class User < ApplicationRecord
  has_secure_password
  has_many :galleries
  
  validates_presence_of :name
  validates_presence_of :email
  validates_uniqueness_of :email
  validates_presence_of :password_digest
  validates_length_of :password, maximum: 72, minimum: 8

  before_validation {
    self.email = self.email.to_s.downcase
  }

  def first_name
    self.name.split.first
  end

  def last_name
    self.name.split.last
  end
end
