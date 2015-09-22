class AddTitleToUsers < ActiveRecord::Migration
  def change
    add_column :users, :title, :integer, default: 0, null: false
  end
end
