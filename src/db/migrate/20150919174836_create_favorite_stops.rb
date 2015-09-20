class CreateFavoriteStops < ActiveRecord::Migration
  def change
    create_table :favorite_stops do |t|
      t.references :user, index: true, foreign_key: true, null: false
      t.references :stop, null: false

      t.timestamps null: false
    end
    add_index :favorite_stops, [:user_id, :stop_id], unique: true
  end
end
