const express = require('express')
const mongoose = require('mongoose')
const Item = require('../models/item')
const auth = require('../middlewares/auth')
const router = new express.Router()

router.post('/additem', auth, (req, res) => {
  try {
    if (req.body.name != '' || req.body.brand != '') {
      let accessory
      for (let i = 0; i < req.body.number; i++) {
        if (req.body.accessory == '') {
          accessory = 'Žádné'
        } else {
          accessory = req.body.accessory
        }
        const item = new Item({
          _id: new mongoose.Types.ObjectId(),
          brand: req.body.brand,
          name: req.body.name,
          type: req.body.type,
          accessory: accessory,
          borrowedBy: '',
          state: 'K dispozici'
        })
        item.save()
      }
      res.redirect('/crud')
    }
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/deleteitems/:name/:brand/:amount', auth, (req, res) => {
  try {
    if (req.params.brand == 'none') {
      req.params.brand = ''
    }
    if (req.params.name == 'none') {
      req.params.name = ''
    }
    for (let i = 0; i < req.params.amount; i++) {
      Item.deleteOne(
        {
          brand: req.params.brand,
          name: req.params.name,
          state: 'K dispozici'
        },
        err => {
          if (err) return handleError(err)
        }
      )
    }
    res.redirect('/crud')
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/deleteitem', auth, (req, res) => {
  try {
    Item.deleteOne({ _id: req.body.id }, err => {
      if (err) return handleError(err)
    })
    res.redirect('/uplnezobrazeni')
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/borrow/:name/:brand/:amount', auth, (req, res) => {
  try {
    if (req.params.brand == 'none') {
      req.params.brand = ''
    }
    if (req.params.name == 'none') {
      req.params.name = ''
    }
    Item.find(
      { brand: req.params.brand, name: req.params.name, state: 'K dispozici' },
      (err, items) => {
        if (req.params.amount <= items.length) {
          for (let i = 0; i < req.params.amount; i++) {
            items[i].borrowedBy = req.user._id
            items[i].state = 'Vypůjčené'
            items[i].borrowDate = new Date().toLocaleDateString('cs-CZ')
            items[i].endDate = new Date(
              Date.now() + 12096e5
            ).toLocaleDateString('cs-CZ')
            items[i].save()
            req.user.borrowed.push(items[i]._id)
          }
          req.user.save()
          res.redirect('/knihovna')
        }
      }
    )
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/return/:name/:brand/', auth, (req, res) => {
  try {
    if (req.params.brand == 'none') {
      req.params.brand = ''
    }
    if (req.params.name == 'none') {
      req.params.name = ''
    }
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
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/change', auth, (req, res) => {
  try {
    Item.find(
      { name: req.body.originalName, brand: req.body.originalBrand },
      (err, items) => {
        items.forEach(item => {
          if (req.body.newBrand !== '') {
            item.brand = req.body.newBrand
          }
          if (req.body.newName !== '') {
            item.name = req.body.newName
          }
          if (req.body.newType !== '') {
            item.type = req.body.newType
          }
          if (req.body.newAccessory !== '') {
            item.accessory = req.body.newAccessory
          }
          item.save()
        })

        if (req.body.newAmount > 0) {
          if (req.body.newAmount < items.length) {
            for (let i = 0; i < items.length - req.body.newAmount; i++) {
              Item.deleteOne(
                {
                  brand: req.body.originalBrand,
                  name: req.body.originalName
                },
                err => {
                  if (err) return handleError(err)
                }
              )
            }
          } else if (req.body.newAmount > items.length) {
            let accs = items[0].accessory
            for (let i = 0; i < req.body.newAmount - items.length; i++) {
              const item = new Item({
                _id: new mongoose.Types.ObjectId(),
                borrowedBy: '',
                state: 'K dispozici',
                accessory: accs
              })

              if (req.body.newBrand !== '') {
                item.brand = req.body.newBrand
              }
              if (req.body.newName !== '') {
                item.name = req.body.newName
              }
              if (req.body.newType !== '') {
                item.type = req.body.newType
              }
              if (req.body.newAccessory !== '') {
                item.accessory = req.body.newAccessory
              }
              if (req.body.newBrand == '') {
                item.brand = req.body.originalBrand
              }
              if (req.body.newName == '') {
                item.name = req.body.originalName
              }
              item.save()
            }
          }
        }
        res.redirect('/crud')
      }
    )
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
