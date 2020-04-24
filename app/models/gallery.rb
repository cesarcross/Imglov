class Gallery < ApplicationRecord
  validates :title, presence: :true

  belongs_to :user
  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true

  def as_json(_opts = {})
    {
      id: id,
      title: title,
      errors: errors,
      image_files: images.map do |image|
        {
          url: "http://localhost:3001#{image.file.url}",
          name: image.file_file_name,
          id: image.id
        }
      end
    }
  end
end
