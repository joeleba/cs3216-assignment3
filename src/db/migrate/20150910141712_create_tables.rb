class CreateTables < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :credit, null: false
      t.string :provider
      t.string :uid
      t.string :name
      t.string :oauth_token
      t.datetime :oauth_expires_at

      t.timestamps null: false
    end

    create_table :services do |t|
      t.string :name, null: false
      t.index :name, unique: true
    end

    create_table :stops do |t|
      t.text :name, null: false
      t.string :longitude
      t.string :latitude
      t.index :name, unique: true
    end

    create_table :services_stops do |t|
      t.belongs_to :service, index: true
      t.belongs_to :stop, index:true
      t.index [:service_id, :stop_id], unique: true
    end
    
  end
end
