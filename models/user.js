const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Eamil is invalid")
            }
        }
    },
    password: {
        type: String,
        require: true,
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User',userSchema)