Knock.setup do |config|
  config.token_lifetime = 1.day
  config.token_signature_algorithm = 'HS256'
  # config.token_secret_signature_key = -> { Rails.application.secrets.secret_key_base } # prior to Rails 5.2
  config.token_secret_signature_key = -> { Rails.application.credentials.read } # Rails 5.2
  config.not_found_exception_class_name = 'ActiveRecord::RecordNotFound'
end
