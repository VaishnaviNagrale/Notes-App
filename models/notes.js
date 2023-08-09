const mongoose = require('mongoose')
const validator = require('validator')

const notesSchema = mongoose.Schema({
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
    title: {
        type: String,
        require: true,
        trim: true,
    },
    desc: {
        type: String,
        require: true,
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Note',notesSchema)