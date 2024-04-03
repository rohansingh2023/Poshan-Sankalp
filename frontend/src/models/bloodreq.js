const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the BloodRequest schema
const bloodRequestSchema = new Schema({
    bloodType: {
        type: String,
        required: true,
        enum: ['apos', 'aneg', 'bpos', 'bneg', 'abpos', 'abneg', 'opos', 'oneg'] // Ensures the blood type is one of these values
    },
    quantity: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    urgent: {
        type: String,
        required: true
    },
    hospitalName: {
        type: String,
        
    },
    reason: {
        type: String,
        
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets to the current date and time
    }
});

// Compile model from schema
const BloodRequest = mongoose.models.bloodrequest || mongoose.model('bloodrequest', bloodRequestSchema);

module.exports = BloodRequest;
