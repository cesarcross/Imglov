class AddUserIdToGalleries < ActiveRecord::Migration[5.2]
  def change
    add_column :galleries, :user_id, :integer
  end
end
