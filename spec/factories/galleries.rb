FactoryBot.define do
  factory :gallery do
    sequence(:title) { |i| "Image Gallery #{i}"}
    association :user

    trait :with_images do
      after(:create) { |gallery| create_list(:image, 5, gallery: gallery) }
    end
  end
end