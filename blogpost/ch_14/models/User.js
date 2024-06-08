const mongoose = require('mongoose')
Schema = mongoose.Schema
uniqueValidator = require('mongoose-unique-validator')
bcrypt = require('bcrypt')

UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please provide password']
    }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User