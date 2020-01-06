const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const userRouter = require('./routers/user')
const auth = require('./middlewares/auth')
const Item = require('./models/item')
const utility = require('./util/utility')
const User = require('./models/user')
require('./db/mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.set('view options', { layout: '../layouts/main' })
hbs.registerPartials(partialsPath)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(publicDirectoryPath))
app.use(cookieParser())
app.use(userRouter)

app.get('/katalog', auth, (req, res) => {
  try {
    Item.find({ state: 'K dispozici' })
      .lean()
      .exec((err, items) => {
        let changedItems = utility.countArrayofObjects(items)
        res.status(201).render('catalog', {
          items: changedItems,
          name: req.user.name,
          surname: req.user.surname,
          admin: req.user.admin
        })
      })
  } catch (e) {
    res.status(404).send('Nějakej fail, kámo!')
  }
})

app.get('/knihovna', auth, (req, res) => {
  try {
    Item.find({ state: 'Vypůjčené', borrowedBy: req.user._id })
      .lean()
      .exec((err, items) => {
        let changedItems = utility.countArrayofObjects(items)

        res.status(201).render('MyLibrary', {
          borrowedItems: changedItems,
          name: req.user.name,
          surname: req.user.surname,
          admin: req.user.admin
        })
      })
  } catch (e) {
    res.status(404).send('Nějakej fail, kámo!')
  }
})

app.get('/nastaveni', auth, (req, res) => {
  try {
    res.status(201).render('settings', {
      name: req.user.name,
      surname: req.user.surname,
      admin: req.user.admin
    })
  } catch (e) {
    res.status(404).send('Nějakej fail, kámo!')
  }
})
app.get('/crud', auth, (req, res) => {
  try {
    if (req.user.admin) {
      Item.find((err, items) => {
        items.forEach(item => {
          if (item.borrowedBy != '') {
            User.findOne({ _id: item.borrowedBy }, (err, user) => {
              item.borrowedBy = `${user.name} ${user.surname}`
            })
          }
        })
        res.status(201).render('crud', {
          allItems: items
        })
      })
    } else {
      res.status(404).send('Nějakej fail, kámo!')
    }
  } catch (e) {
    res.status(404).send('Nějakej fail, kámo!')
  }
})

app.post('/additem', auth, (req, res) => {
  for (let i = 0; i < req.body.number; i++) {
    const item = new Item({
      _id: new mongoose.Types.ObjectId(),
      brand: req.body.brand,
      name: req.body.name,
      type: req.body.type,
      borrowedBy: '',
      state: 'K dispozici'
    })
    item.save()
  }
  res.redirect('/crud')
})

app.post('/deleteitem', auth, (req, res) => {
  Item.deleteOne({ _id: req.body.id }, err => {
    if (err) return handleError(err)
  })
  res.redirect('/crud')
})

app.post('/borrow/:name/:brand/:amount', auth, (req, res) => {
  Item.find(
    { brand: req.params.brand, name: req.params.name, state: 'K dispozici' },
    (err, items) => {
      for (let i = 0; i < req.params.amount; i++) {
        items[i].borrowedBy = req.user._id
        items[i].state = 'Vypůjčené'
        items[i].borrowDate = new Date().toLocaleDateString('cs-CZ')
        items[i].endDate = new Date(Date.now() + 12096e5).toLocaleDateString(
          'cs-CZ'
        )
        items[i].save()
        req.user.borrowed.push(items[i]._id)
      }
      req.user.save()
    }
  )
  res.redirect('/knihovna')
})

app.post('/return/:name/:brand/', auth, (req, res) => {
  Item.find(
    {
      brand: req.params.brand,
      name: req.params.name,
      state: 'Vypůjčené',
      borrowedBy: req.user._id
    },
    (err, items) => {
      items.forEach(item => {
        item.borrowedBy = ''
        ;(item.state = 'K dispozici'), (item.borrowDate = '')
        item.endDate = ''
        item.save()
        req.user.borrowed.splice(req.user.borrowed.indexOf(item._id), 1)
      })
      req.user.save()
      res.redirect('/knihovna')
    }
  )
})

app.get('*', (req, res) => {
  res.send('404 not found')
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
