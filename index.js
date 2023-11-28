require("dotenv").config();
const app = require("./src/app");
const http = require('http');
const connectDB = require("./src/db/connect.DB");
const server = http.createServer(app);

const port = process.env.PORT || 5000;

const main = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`pet adoption is running on port ${port}`);
    });
}
main();