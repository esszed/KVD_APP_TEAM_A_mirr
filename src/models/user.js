const mongoose = require("mongoose")
const validator = require("validator")
const bCrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    }
})


userSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified("password")) {
        user.password = await bCrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model("user", userSchema)

module.exports = User