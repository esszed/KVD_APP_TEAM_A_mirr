const path = require("path")
const express = require("express")
const hbs = require("hbs")

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    try {
        res.status(201).render("index")
    } catch (e) {
        res.status(404).send("Nějakej fail, kámo!")
    }
})

app.get("/registrace", (req, res) => {
    try {
        res.status(201).render("registrace")
    } catch (e) {
        res.status(404).send("Nějakej fail, kámo!")
    }
})

app.get("/katalog", (req, res) => {
    try {
        res.status(201).render("catalog")
    } catch (e) {
        res.status(404).send("Nějakej fail, kámo!")
    }
})

app.get("/myLibrary", (req, res) => {
    try {
        res.status(201).render("MyLibrary")
    } catch (e) {
        res.status(404).send("Nějakej fail, kámo!")
    }
})

app.get("*", (req, res) => {
    res.send("404 not found")
})



app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})