const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/user')
const Item = require('../models/item')
const auth = require('../middlewares/auth')
const router = new express.Router()

router.post('/additem', auth, (req, res) => {
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

router.post('/deleteitems/:name/:brand/:amount', auth, (req, res) => {
  for (let i = 0; i < req.params.amount; i++) {
    Item.deleteOne(
      { brand: req.params.brand, name: req.params.name, state: 'K dispozici' },
      err => {
        if (err) return handleError(err)
      }
    )
  }
  res.redirect('/crud')
})

router.post('/deleteitem', auth, (req, res) => {
  Item.deleteOne({ _id: req.body.id }, err => {
    if (err) return handleError(err)
  })
  res.redirect('/uplnezobrazeni')
})

router.post('/borrow/:name/:brand/:amount', auth, (req, res) => {
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

router.post('/return/:name/:brand/', auth, (req, res) => {
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
        item.state = 'K dispozici'
        item.borrowDate = ''
        item.endDate = ''
        item.save()
        req.user.borrowed.splice(req.user.borrowed.indexOf(item._id), 1)
      })
      req.user.save()
      res.redirect('/knihovna')
    }
  )
})

module.exports = router
