import "dotenv/config";
import runDbMigrations from "./database/migrations/index.js";
import express from "express";
import usersRoute from "./routes/userRoutes.js";
import announcementsRoute from "./routes/announcementsRoutes.js";
import reportsRoute from "./routes/reportsRoutes.js";
import aplicationsRoute from "./routes/aplicationsRoutes.js";
import formularsRoute from "./routes/formularsRoute.js";
import cors from "cors";

// Initialize the app
const app = express();

// Set a port
const PORT = process.env.PORT || 3000;

//Check Database
await runDbMigrations();

// Middleware to parse JSON bodies (for POST and PUT requests)
app.use(express.json());

app.use(
  cors({
    origin:
      "https://announcements-portal-frontend-production-e3c2.up.railway.app",
  })
);

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// Create a simple check route
app.get("/api/", (req, res) => {
  res.send("Server Work");
});

// Set up the user route (prefix with /users)
app.use("/api/users", usersRoute);

// Set up the user route (prefix with /announcements)
app.use("/api/announcements", announcementsRoute);

// Set up the user route (prefix with /reports)
app.use("/api/reports", reportsRoute);

// Set up the user route (prefix with /aplications)
app.use("/api/aplications", aplicationsRoute);

// Set up the user route (prefix with /formulars)
app.use("/api/formulars", formularsRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/`);
});
