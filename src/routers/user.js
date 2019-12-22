const express = require("express")
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



module.exports = router