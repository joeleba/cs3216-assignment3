class CreateTables < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :fb_id
      t.text :access_token
      t.integer :credit
    end

    create_table :services do |t|
      t.string :name
    end

    # One bus might have multiple timings depends on the time of the day
    # But I think currently can ignore this
    create_table :timings do |t|
      t.integer :time_before
      t.integer :frequency
      t.boolean :is_saturday
      t.boolean :is_sunday_ph
      t.boolean :is_sch_holiday
      t.boolean :no_service

      t.integer :service_id, null: false
      t.foreign_key :services, column: :service_id
    end

    create_table :stops do |t|
      t.text :name, null: false
      t.decimal :longitude, :precision => 15, :scale => 13
      t.decimal :latitude, :precision => 15, :scale => 13
    end

    create_table :services_stops do |t|
      t.integer :service_id, null: false
      t.foreign_key :services, column: :service_id

      t.integer :stop_id, null: false
      t.foreign_key :stops, column: :stop_id
    end
  end
end
