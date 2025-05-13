// api/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config();
const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicle');
const locationRoutes = require("./routes/location");
const kycRoutes = require("./routes/kyc");
const bookingRoutes = require("./routes/booking");
const pickupRoutes = require("./routes/pickupRoutes");
const dropoffRoutes = require("./routes/dropoffRoutes");
const userBookingRoutes = require("./routes/userBooking");

app.use('/api', pickupRoutes);
app.use('/api', dropoffRoutes);
app.use('/api', userBookingRoutes);

app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use('/api', vehicleRoutes);
app.use('/api/kyc', kycRoutes);

app.get("/", (req, res) => {
    res.json({ message: "EV Rental API is running" });
});

// Error handler
app.use((err, req, res, next) => {
    console.error("Global error handler:", err);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
    });
});

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