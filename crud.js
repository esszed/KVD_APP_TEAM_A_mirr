const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(
  'mongodb://localhost:27017/applicationDB',
  { useUnifiedTopology: true, useNewUrlParser: true }
)
const itemSchema = Schema({
  _id: Schema.Types.ObjectId,
  brand: String,
  name: String,
  type: String,
  state: String,
  borrowedby: String
})
const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  surname: String,
  borrowed: [{ type: mongoose.Schema.ObjectId, ref: 'Item' }]
})
const Item = mongoose.model('Item', itemSchema)
const Person = mongoose.model('Person', personSchema)
const addItem = (req, res) => {
  for (let i = 0; i < req.body.number; i++) {
    const item = new Item({
      _id: new mongoose.Types.ObjectId(),
      brand: req.body.brand,
      name: req.body.name,
      type: req.body.type,
      state: 'K dispozici',
      borrowedby: ''
    })
    item.save()
  }
  res.redirect('/crud')
}

const deleteItem = (req, res) => {
  Item.deleteOne({ _id: req.body.id }, err => {
    if (err) return handleError(err)
  })
  res.redirect('/crud')
}

const addPerson = (req, res) => {
  const person = new Person({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.jmeno,
    surname: req.body.prijmeni
  })
  person.save()
  res.redirect('/crud')
}

const deletePerson = (req, res) => {
  Person.deleteOne({ _id: req.body.id }, err => {
    if (err) return handleError(err)
  })
  res.redirect('/crud')
}

module.exports = {
  Item: Item,
  Person: Person,
  addItem: addItem,
  deleteItem: deleteItem,
  addPerson: addPerson,
  deletePerson: deletePerson
}
