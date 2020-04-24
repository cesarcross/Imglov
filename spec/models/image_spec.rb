require 'rails_helper'

RSpec.describe Image, type: :model do
  it { is_expected.to belong_to(:gallery) }
  it { is_expected.to have_attached_file(:file) }
  it { is_expected.to validate_attachment_content_type(:file)
    .allowing('image/jpg', 'image/jpeg', 'image/png', 'image/gif')
    .rejecting('text/plain', 'text/xml') }
  it { should validate_attachment_size(:file).less_than(2.megabytes) }
end
