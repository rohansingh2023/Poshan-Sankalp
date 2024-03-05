const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true

    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    isDoner: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.methods.generateToken = function () {
    try {
        return jwt.sign({
            useriid: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
            process.env.SIGNETUREServer,
            {
                expiresIn: "30d",
            });
    } catch (error) {
        console.log(error);
    }
};

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = new mongoose.model('user', userSchema);

module.exports = User;