const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = Schema({
  _id: Schema.Types.ObjectId,
  brand: String,
  name: String,
  type: String,
  state: String,
  borrowedBy: String,
  borrowDate: String,
  endDate: String
})
const Item = mongoose.model('Item', itemSchema)
module.exports = Item
