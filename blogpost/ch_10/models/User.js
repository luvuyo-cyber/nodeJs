const mongoose = require('mongoose')
Schema = mongoose.Schema;
bcrypt = require('bcrypt')

// UserSchema = new Schema({
//     username: String,
//     password: String
// });

UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})
// export model
const User = mongoose.model('User', UserSchema);
module.exports = User