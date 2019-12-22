const path = require("path")
const express = require("express")
const hbs = require("hbs")
const userRouter = require("./routers/user")
require("./db/mongoose")

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


app.set("view engine", "hbs")
app.set("views", viewsPath)
app.set("view options", { layout: "../layouts/main" })
hbs.registerPartials(partialsPath)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDirectoryPath))
app.use(userRouter)



app.get("/katalog", (req, res) => {
    try {
        res.status(201).render("catalog")
    } catch (e) {
        res.status(404).send("Nějakej fail, kámo!")
    }
})

app.get("/knihovna", (req, res) => {
    try {
        res.status(201).render("MyLibrary")
    } catch (e) {
        res.status(404).send("Nějakej fail, kámo!")
    }
})

app.get("/nastaveni", (req, res) => {
    try {
        res.status(201).render("settings")
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