const mongoose = require("mongoose")



const appointmentsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true

    },
    treatments: {
        type: [String],
        required: true
    },
    hour: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    phone:{
        type: String,
        required:true
    }
})

const Appointment = mongoose.model('appointment', appointmentsSchema);

module.exports = Appointment;