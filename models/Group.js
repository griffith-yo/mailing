const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  addresses: [{ type: String, require: true }],
  file: { type: Object },
})

module.exports = model('Group', schema)
