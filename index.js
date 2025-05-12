const dotenv = require('dotenv');
const connectDB = require('./config/database.js');
const app = require('./app.js');


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        console.log("MongoDB connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();

module.exports = app;
