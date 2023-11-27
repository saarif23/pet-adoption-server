const { model, Schema } = require("mongoose");

const DonationCampaigns = new Schema({

    pet_name: {
        type: String,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },

})


const Donations = model("donationCampaigns", DonationCampaigns)

module.exports = Donations;



