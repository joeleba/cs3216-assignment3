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

ActiveRecord::Schema.define(version: 20150921201538) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "services", force: :cascade do |t|
    t.string "name", null: false
  end

  add_index "services", ["name"], name: "index_services_on_name", unique: true, using: :btree

  create_table "services_stops", force: :cascade do |t|
    t.integer "service_id"
    t.integer "stop_id"
  end

  add_index "services_stops", ["service_id", "stop_id"], name: "index_services_stops_on_service_id_and_stop_id", unique: true, using: :btree
  add_index "services_stops", ["service_id"], name: "index_services_stops_on_service_id", using: :btree
  add_index "services_stops", ["stop_id"], name: "index_services_stops_on_stop_id", using: :btree

  create_table "stops", force: :cascade do |t|
    t.text   "name",      null: false
    t.string "longitude"
    t.string "latitude"
  end

  add_index "stops", ["name"], name: "index_stops_on_name", unique: true, using: :btree

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
    t.integer  "credit",                       null: false
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "title",            default: 0, null: false
  end

  add_foreign_key "timings", "services"
end
