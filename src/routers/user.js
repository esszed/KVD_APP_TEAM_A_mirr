const express = require("express")
const bCrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const router = new express.Router()


router.get("/", (req, res) => {
    try {
        res.status(201).render("index", { title: "Login" })
    } catch (e) {
        res.status(404).send("Nějakej fail, kámo!")
    }
})

router.get("/registrace", (req, res) => {
    try {
        res.status(201).render("registrace", { title: "Registrace" })
    } catch (e) {
        res.status(404).send("Nějakej fail, kámo!")
    }
})

router.post("/registrace", async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).render("index", { message: "Jste zaregistrován, přihlaste se!" })
    } catch (e) {
        console.log(user)
        res.status(400).send(e)
    }
})

router.post("/", async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.render("index", { message: "Uživatel nenalezen!" })
    }
    const validPass = await bCrypt.compare(req.body.password, user.password)
    if (!validPass) {
        return res.render("index", { message: "Uživatel nenalezen!" })
    }

    jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: "1h"
    }, (err, token) => {
        if (err) {
            res.send("Token is not valid!")
        } else {
            res.render("catalog", { token })
        }
    })
})



module.exports = router