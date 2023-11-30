const express = require('express');
const applyMiddleware = require('./middlewares/applyMiddleware');
const connectDB = require('./db/connect.DB');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;


const authenticationRoutes = require('./routes/Authentication/index');
const petsRoutes = require('./routes/Pets/index')
const allPetsRoute = require('./routes/Pets/allpets')
const categoriesRoutes = require("./routes/Categories/index")
const usersRoutes = require('./routes/Users/index')
const adoptReqRoute = require('./routes/AdoptReq/index')
const donationCampaignsRoute = require('./routes/DonationCampaigns/index')
const allDonationCampaignsRoute = require('./routes/DonationCampaigns/allCampaigns')
const userAddedPet = require('./routes/UserPet/index')
const userAddedDonations = require('./routes/UserDonations/index')
const searchRoute = require('./routes/Pets/getPet')
const stripeRoute = require('./routes/Stripe/index')
const paymentRoute = require('./routes/Payment/index')


//------------------all middlewares------------------------
applyMiddleware(app);


app.use(authenticationRoutes);
app.use(petsRoutes);
app.use(allPetsRoute);
app.use(usersRoutes);
app.use(categoriesRoutes);
app.use(adoptReqRoute);
app.use(donationCampaignsRoute);
app.use(allDonationCampaignsRoute);
app.use(userAddedPet);
app.use(userAddedDonations);
app.use(searchRoute);
app.use(stripeRoute)
app.use(paymentRoute)



app.get("/health", (req, res) => {
    res.send("Welcome to the pet adoption server  ....");
});

app.all("*", (req, res, next) => {
    const error = new Error(`the request url  is invalid ${req.url}`)
    error.status == 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    })
})


// const main = async () => {
//     await connectDB();
//     app.listen(port, () => {
//         console.log(`pet adoption is running on port ${port}`);
//     });
// }


// main();

module.exports = app;