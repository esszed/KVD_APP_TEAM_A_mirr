const path = require("path")
const express = require("express")
const hbs = require("hbs")
const cookieParser = require("cookie-parser")
const userRouter = require("./routers/user")
const auth = require("./middlewares/auth")
require("./db/mongoose")

require("dotenv").config()



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
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDirectoryPath))
app.use(cookieParser())
app.use(userRouter)



app.get("/katalog", auth, (req, res) => {
    try {
        res.status(201).render("catalog")
    } catch (e) {
        res.status(404).send("Nějakej fail, kámo!")
    }
})

app.get("/knihovna", auth, (req, res) => {
    try {
        res.status(201).render("MyLibrary")
    } catch (e) {
        res.status(404).send("Nějakej fail, kámo!")
    }
})

app.get("/nastaveni", auth, (req, res) => {
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