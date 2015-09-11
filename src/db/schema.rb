# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150910141712) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "services", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "services_stops", force: :cascade do |t|
    t.integer "service_id", null: false
    t.integer "stop_id",    null: false
  end

  create_table "stops", force: :cascade do |t|
    t.text    "name",                                null: false
    t.decimal "longitude", precision: 15, scale: 13
    t.decimal "latitude",  precision: 15, scale: 13
  end

  create_table "timings", force: :cascade do |t|
    t.integer "time_before"
    t.integer "frequency"
    t.boolean "is_saturday"
    t.boolean "is_sunday_ph"
    t.boolean "is_sch_holiday"
    t.boolean "no_service"
    t.integer "service_id",     null: false
  end

  create_table "users", force: :cascade do |t|
    t.string  "fb_id",        null: false
    t.text    "access_token", null: false
    t.integer "credit",       null: false
  end

  add_foreign_key "services_stops", "services"
  add_foreign_key "services_stops", "stops"
  add_foreign_key "timings", "services"
end
