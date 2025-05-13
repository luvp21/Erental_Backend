// api/index.js
const serverless = require("serverless-http");
const app = require("./app");
const connectDB = require("../config/database");

let isConnected = false;

module.exports.handler = async (event, context) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("MongoDB connected.");
  }
  const handler = serverless(app);
  return handler(event, context);
};