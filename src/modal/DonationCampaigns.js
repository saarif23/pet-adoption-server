const { model, Schema } = require("mongoose");

const DonationCampaigns = new Schema({


    pet_name: {
        type: String,
        required: true
    },
    pet_age: {
        type: Number,
        required: true
    },
    pet_image: {
        type: String,
        required: true
    },
    maximum_donation_amount: {
        type: Number,
        required: true
    },
    donated_amount: {
        type: Number,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    long_description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})


const Donations = model("donationCampaigns", DonationCampaigns)

module.exports = Donations;



