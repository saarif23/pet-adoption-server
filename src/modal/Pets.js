const { model, Schema } = require("mongoose");

const PetsSchema = new Schema({

    "pet_name": {
        type: String,
        required: true
    },
    "pet_age": {
        type: Number,
        required: true
    },
    'pet_image': {
        type: String,
        required: true
    },
    "pet_location": {
        type: String,
        required: true
    },
    "pet_category": {
        type: String,
        required: true
    },
    "short_description": {
        type: String,
        required: true
    },
    "long_description": {
        type: String,
        required: true
    },
    "adopted": {
        type: Boolean,
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


const Pets = model("Pets", PetsSchema)

module.exports = Pets



