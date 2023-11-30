const { Schema, default: mongoose } = require("mongoose");

const AdoptReq = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    petId: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const UserAdoptReq = mongoose.model("adoptReq", AdoptReq);

module.exports = UserAdoptReq;