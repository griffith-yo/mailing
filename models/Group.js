const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  emails: [{ type: String, require: true }],
  tags: [{ type: String }],
  date: { type: Date, default: Date.now() },
  file: { type: Object },
})

module.exports = model('Group', schema)
