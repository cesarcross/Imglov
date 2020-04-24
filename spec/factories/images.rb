FactoryBot.define do
  factory :image do
    association :gallery
    file { File.new("#{Rails.root}/spec/files/attachment.png")}
  end
end
