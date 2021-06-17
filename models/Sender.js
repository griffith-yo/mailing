const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  smtp: { type: String },
  port: { type: String },
  secure: { type: String },
  service: { type: String, require: true },
  date: { type: Date, default: Date.now() },
})

module.exports = model('Sender', schema)
