const { Schema, model } = require("mongoose");

const CategoriesSchma = new Schema({
    pet_category: {
        type: String,
        required: true
    },
    category_image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Categories = model("Categories", CategoriesSchma)

module.exports = Categories

