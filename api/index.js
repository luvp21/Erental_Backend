const serverless = require("serverless-http");
const app = require("../app");
const connectDB = require("../config/database");

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true; // Avoid reconnecting on every request
  }

  const handler = serverless(app);
  return handler(req, res);
};