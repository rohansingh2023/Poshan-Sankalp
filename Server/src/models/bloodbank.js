const mongoose = require('mongoose');
const validator = require('validator');

const bloodbankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phone:{
        type: Number,
        min:10,
        required:true,
        unique:true
    },
    address:{
        type: String,
        required: true
    },
    apos:{
        type:Number,
        min:5,
        required:true
    },
    abpos:{
        type:Number,
        min:5,
        required:true
    },
    bpos:{
        type:Number,
        min:5,
        required:true
    },
    opos:{
        type:Number,
        min:5,
        required:true
    },
    aneg:{
        type:Number,
        min:5,
        required:true
    },
    abneg:{
        type:Number,
        min:5,
        required:true
    },
    bneg:{
        type:Number,
        min:5,
        required:true
    },
    oneg:{
        type:Number,
        min:5,
        required:true
    },
    
})

const Bloodbank = new mongoose.model('bloodbank', bloodbankSchema);

module.exports = Bloodbank;