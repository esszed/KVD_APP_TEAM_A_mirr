const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const userRouter = require('./routers/user')
const databaseInteractionsRouter = require('./routers/databaseInteractions')
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
app.use(userRouter, databaseInteractionsRouter)

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
      Item.find()
        .lean()
        .exec((err, items) => {
          let changedItems = utility.countArrayofObjects2(items)
          res.status(201).render('crud', {
            items: changedItems,
            name: req.user.name,
            surname: req.user.surname,
            admin: req.user.admin
          })
        })
    } else {
      res.status(404).send('Nějakej fail, kámo!')
    }
  } catch (e) {
    res.status(404).send('Nějakej fail, kámo!')
  }
})

app.get('/uplnezobrazeni', auth, (req, res) => {
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
        res.status(201).render('ItemsFullDB', {
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

app.get('/celkovyprehled', auth, (req, res) => {
  try {
    if (req.user.admin) {
      Item.find({ state: 'Vypůjčené' })
        .lean()
        .exec((err, items) => {
          let changedItems = utility.countArrayofObjects3(items)
          changedItems.forEach(item => {
            if (item.borrowedBy != '') {
              User.findOne({ _id: item.borrowedBy }, (err, user) => {
                item.borrowedBy = `${user.name} ${user.surname}`
              })
            }
          })

          res.status(201).render('generalOverview', {
            items: changedItems,
            name: req.user.name,
            surname: req.user.surname,
            admin: req.user.admin
          })
        })
    } else {
      res.status(404).send('Nějakej fail, kámo!')
    }
  } catch (e) {
    res.status(404).send('Nějakej fail, kámo!')
  }
})

app.get('*', (req, res) => {
  res.send('404 not found')
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
