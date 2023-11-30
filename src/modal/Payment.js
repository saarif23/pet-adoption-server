const { model, Schema } = require("mongoose");

const PaymentSchema = new Schema({

    "pet_name": {
        type: String,
        required: true
    },
    'pet_image': {
        type: String,
        required: true
    },
    'petId': {
        type: String,
        required: true
    },
    'transactionId': {
        type: String,
        required: true
    },
    'donate': {
        type: Number,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})


const Payments = model("Payments", PaymentSchema)

module.exports = Payments



