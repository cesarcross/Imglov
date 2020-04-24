module AuthSupport
  def auth_header(user)
    if user
      token = Knock::AuthToken.new(payload: { sub: user.id }).token
      {
        Authorization: "Bearer #{token}"
      }
    end
  end
end