const { model, Schema } = require("mongoose");


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Users = model("Users", UserSchema)

module.exports = Users;