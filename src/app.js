const express = require('express');
const applyMiddleware = require('./middlewares/applyMiddleware');
const connectDB = require('./db/connect.DB');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//------------------all middlewares------------------------
applyMiddleware(app);






app.get("/health", (req, res) => {
    res.send("Welcome to the pet adoption server home....");
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


const main = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`pet adoption is running on port ${port}`);
    });
}


main();