import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // Import the middleware
import db from "../database/db.js";

const router = express.Router();

// Define routes for reports

// GET /reports - Retrieve all reports
router.get("/", authMiddleware, (req, res) => {
  res.send("Retrieve all reports");
});

// GET /reports/length - Retrieve all reports
router.get("/length", async (req, res) => {
  // const sql = "SELECT * FROM reports";
  // const data = await db.query(sql);
  // const outputValue = data.rows.length;
  // res.status(201).send({ dataLength: outputValue });
});

// GET /reports/:id - Retrieve a user by ID
router.get("/:id", authMiddleware, (req, res) => {
  const userId = req.params.id;
  res.send(`Retrieve report with ID: ${userId}`);
});

// POST /reports/new - Create a new user
router.post("/new", authMiddleware, (req, res) => {
  // Here you would handle creating a new user
  res.send("Create a new report");
});

// PUT /reports/:id - Update a user by ID
router.put("/:id", authMiddleware, (req, res) => {
  const userId = req.params.id;
  // Here you would handle updating the user with the given ID
  res.send(`Update report with ID: ${userId}`);
});

// DELETE /reports/:id - Delete a user by ID
router.delete("/:id", authMiddleware, (req, res) => {
  const userId = req.params.id;
  // Here you would handle deleting the user with the given ID
  res.send(`Delete report with ID: ${userId}`);
});

export default router;
