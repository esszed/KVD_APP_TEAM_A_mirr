const mongoose = require("mongoose")

const connectionURL = "mongodb://127.0.0.1:270117/kvd_api"

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

