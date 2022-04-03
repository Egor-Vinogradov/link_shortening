const { Schema, model, Types } = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {
        type: String,
        required: true,
        set(val) {
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(val, salt)
            return hash
        }
    },
    links: [{
        type: Types.ObjectId,
        ref: 'Link'
    }]
})

module.exports = model('User', schema)