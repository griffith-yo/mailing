const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  group: { type: Types.ObjectId, required: true },
  sender: { type: Types.ObjectId, require: true },
  theme: { type: String, require: true },
  body: { type: String, require: true },
  attachments: { type: Array },
})

module.exports = model('Mail', schema)
