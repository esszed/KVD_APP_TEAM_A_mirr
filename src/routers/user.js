const express = require('express')
const bCrypt = require('bcryptjs')
const User = require('../models/user')
const auth = require('../middlewares/auth')
const router = new express.Router()

router.get('/', (req, res) => {
  try {
    if (req.cookies['auth-token']) {
      return res.redirect('/katalog')
    }
    res.status(201).render('index', { title: 'Login' })
  } catch (e) {
    res.status(404).send('Nějakej fail, kámo!')
  }
})

router.get('/registrace', async (req, res) => {
  const admin = await User.find({ admin: true })
  try {
    if (req.cookies['auth-token']) {
      return res.redirect('/katalog')
    }

    if (admin.length == 0) {
      return res.status(201).render('registrace', { title: 'Registrace', display: "block" })
    }

    res.status(201).render('registrace', { title: 'Registrace', display: "none" })
  } catch (e) {
    res.status(404).send('Nějakej fail, kámo!')
  }
})

router.post('/registrace', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).render('index', { message: 'Jste zaregistrován, přihlaste se!' })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.render('index', { message: 'Uživatel nenalezen!' })
  }
  const validPass = await bCrypt.compare(req.body.password, user.password)
  if (!validPass) {
    return res.render('index', { message: 'Uživatel nenalezen!' })
  }

  const token = await user.generateAuthToken()
  res.cookie('auth-token', token, { expire: 3600 + Date.now() }).redirect('/')
})

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    })
    await req.user.save()
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/nastaveni', auth, async (req, res) => {
  const currPass = req.user.password
  const bodyPass = req.body.oldPass
  const newPass = req.body.newPass

  const hashPass = bCrypt.hashSync(newPass, 8);
  try {
    const isMatch = bCrypt.compareSync(bodyPass, currPass)
    if (!isMatch) {
      return res.render("settings", {
        isGreen: false,
        message: 'Zadali jste špatné heslo, zkuste to prosím znovu.',
        name: req.user.name,
        surname: req.user.surname,
        admin: req.user.admin
      })
    }
    else {
      User.updateOne({ password: currPass }, { $set: { password: hashPass } }, (err) => {
        if (err) {
          return console.log(err)
        } else {
          res.render("settings", {
            isGreen: true,
            message: 'Heslo bylo změněno.',
            name: req.user.name,
            surname: req.user.surname,
            admin: req.user.admin
          })
        }
      })
    }
  } catch (e) {
    res.status(404).send(e)
  }
})

module.exports = router
