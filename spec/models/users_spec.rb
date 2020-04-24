require 'rails_helper'

RSpec.describe User, type: :model do
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_presence_of(:password_digest) }
  it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
  it { is_expected.to have_many(:galleries) }

  it 'is not valid if the password is less than 8 characters in length' do
    user = User.new(name: 'Tom', email: 'tom@ex.com', password: '12345')
    expect(user).to_not be_valid
  end

  it 'is not valid if the password is greater than 72 characters in length' do
    password = 'a' * 73
    user = User.new(name: 'Tom', email: 'tom@ex.com', password: password)
    expect(user).to_not be_valid
  end
  
  describe '#first_name returns' do
    it 'the first name when full name provided' do
      user = User.create(name: 'Tom Jones', email: 'tom@ex.com', password: '12345678')
      expect(user.first_name).to eq('Tom')
    end
    
    it 'the name when a single word string is provided' do
      user = User.create(name: 'Tom', email: 'tom@ex.com', password: '12345678')
      expect(user.first_name).to eq('Tom')
    end
  end
  
  describe '#last_name returns' do
    it 'the last name when the full name is provided' do
      user = User.create(name: 'Tom Jones', email: 'tom@ex.com', password: '12345678')
      expect(user.last_name).to eq('Jones')
    end
    
    it 'the name when a single word string is provided' do
      user = User.create(name: 'Tom', email: 'tom@ex.com', password: '12345678')
      expect(user.last_name).to eq('Tom')
    end
  end

  it 'should validate the uniqueness of email' do
    skip 'no longer necessary'
    User.create(name: 'Tom', email: 'tom@ex.com', password: '12345678')
    user = User.new(name: 'Tom', email: 'TOM@ex.com', password: '12345678')
    expect(user).to_not be_valid
  end

  it 'User has many galleries' do
    skip 'no longer necessary'
    user = User.create(name: 'Tom', email: 'tom@ex.com', password: '12345678')
    gallery = Gallery.create(title: 'Test Gallery', user: user)
    expect(user.galleries).to include(gallery)
  end
end