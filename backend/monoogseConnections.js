const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Children_Art');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
});

module.exports = mongoose.model('user', userSchema)