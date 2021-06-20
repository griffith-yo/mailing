const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  group: { type: Types.ObjectId, required: true },
  sender: { type: Types.ObjectId, require: true },
  theme: { type: String, require: true },
  body: { type: String, require: true },
  results: { type: Array, require: true },
  attachments: { type: Array },
  date: { type: Date, default: Date.now() },
})

module.exports = model('Mail', schema)
