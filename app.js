const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()
const crud = require('./crud.js')
const utility = require('./utility.js')
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

// Funkční kod
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/catalog', (req, res) => {
  // Musím napsat podmínku- prohledat jednou s k dispozici, když žádnej s k dispozici nebude prohledat všechny a změnit hodnotu počtu na 0
  crud.Item.find({ state: 'K dispozici' })
    .lean() // lean vrací mongoose documenty jako plain JS
    .exec((err, items) => {
      let changedItems = utility.countArrayofObjects(items)
      res.render('sites/catalog', {
        items: changedItems
      })
    })
})

app.get('/mylibrary', (req, res) => {
  crud.Item.find({ state: 'Vypůjčené' })
    .lean()
    .exec((err, items) => {
      let changedItems = utility.countArrayofObjects(items)

      res.render('sites/mylibrary', {
        borrowedItems: changedItems
      })
    })
})

app.get('/crud', (req, res) => {
  crud.Item.find((err, items) => {
    crud.Person.find((err, people) => {
      res.render('sites/crud', {
        allItems: items,
        people: people
      })
    })
  })
})

app.post('/additem', (req, res) => {
  crud.addItem(req, res)
})

app.post('/deleteitem', (req, res) => {
  crud.deleteItem(req, res)
})

app.post('/addperson', (req, res) => {
  crud.addPerson(req, res)
})

app.post('/deleteperson', (req, res) => {
  crud.deletePerson(req, res)
})

app.post('/borrow/:name/:brand/:amount', (req, res) => {
  crud.Item.find({ brand: req.params.brand, name: req.params.name, state: 'K dispozici' }, (err, items) => {
    for (let i = 0; i < req.params.amount; i++) {
      items[i].borrowedby = '5dcd65978060722cdcdc4942' // funčkní pouze pro provizorního člověka správně musí být dynamicky
      items[i].state = 'Vypůjčené'
      items[i].save()
    }
  })
  res.redirect('/catalog')
})

app.post('/return/:name/:brand/', (req, res) => {
  crud.Item.find({ brand: req.params.brand, name: req.params.name, state: 'Vypůjčené' }, (err, items) => {
    items.forEach(item => {
      item.borrowedby = ''
      item.state = 'K dispozici'
      item.save()
    })

    res.redirect('/mylibrary')
  })
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
