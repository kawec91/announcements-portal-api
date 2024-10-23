// import "dotenv/config";
// import runDbMigrations from "./database/migrations/index.js";
// import express from "express";
// import usersRoute from "./routes/userRoutes.js";
// import announcementsRoute from "./routes/announcementsRoutes.js";
// import reportsRoute from "./routes/reportsRoutes.js";
// import aplicationsRoute from "./routes/aplicationsRoutes.js";
// import formularsRoute from "./routes/formularsRoute.js";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// // Initialize the app
// const app = express();

// // Set a port
// const PORT = process.env.PORT || 3000;

// //Check Database
// await runDbMigrations();

// // Create __dirname equivalent for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Ensure uploads directory exists
// const uploadDir = path.join(__dirname, "../uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log(`Directory created: ${uploadDir}`);
// } else {
//   console.log(`Directory already exists: ${uploadDir}`);
// }

// // Serve static files from the "uploads" directory
// app.use("/uploads", express.static("uploads"));

// // Middleware to parse JSON bodies (for POST and PUT requests)
// app.use(express.json());

// //
// // app.use(
// //   cors({
// //     origin:
// //       "https://announcements-portal-frontend-production-e3c2.up.railway.app",
// //   })
// // );

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// // Create a simple check route
// app.get("/api/", (req, res) => {
//   res.send("Server Work");
// });

// // Set up the user route (prefix with /users)
// app.use("/api/users", usersRoute);

// // Set up the user route (prefix with /announcements)
// app.use("/api/announcements", announcementsRoute);

// // Set up the user route (prefix with /reports)
// app.use("/api/reports", reportsRoute);

// // Set up the user route (prefix with /aplications)
// app.use("/api/aplications", aplicationsRoute);

// // Set up the user route (prefix with /formulars)
// app.use("/api/formulars", formularsRoute);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}/api/`);
// });

require("dotenv/config");
const express = require("express");
const usersRoute = require("./routes/userRoutes.js");
const announcementsRoute = require("./routes/announcementsRoutes.js");
const reportsRoute = require("./routes/reportsRoutes.js");
const aplicationsRoute = require("./routes/aplicationsRoutes.js");
const formularsRoute = require("./routes/formularsRoute.js");
const cors = require("cors");
const path = require("path");
const { fileURLToPath } = require("url");
const fs = require("fs");
const runDbMigrations = require("./database/migrations/index.js");

// Initialize the app
const app = express();

// Set a port
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Check Database
  await runDbMigrations();

  // Create __dirname equivalent for ES modules
  //const __filename = fileURLToPath(import.meta.url);
  //const __dirname = path.dirname(__filename);

  const __dirname = path.resolve(); // Get the current working directory

  // Ensure uploads directory exists
  const uploadDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Directory created: ${uploadDir}`);
  } else {
    console.log(`Directory already exists: ${uploadDir}`);
  }

  // Serve static files from the "uploads" directory
  app.use("/uploads", express.static("uploads"));

  // Middleware to parse JSON bodies
  app.use(express.json());

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    })
  );

  // Create a simple check route
  app.get("/api/", (req, res) => {
    res.send("Server Work");
  });

  // Set up the routes
  app.use("/api/users", usersRoute);
  app.use("/api/announcements", announcementsRoute);
  app.use("/api/reports", reportsRoute);
  app.use("/api/aplications", aplicationsRoute);
  app.use("/api/formulars", formularsRoute);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api/`);
  });
};

// Start the server and handle errors
startServer().catch((err) => {
  console.error("Error starting the server:", err);
});