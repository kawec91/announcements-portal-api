import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // Import the middleware
import db from "../database/db.js";

const router = express.Router();

// Define routes for announcements

// GET /announcements - Retrieve all announcements
//authMiddleware,
router.get("/", async (req, res) => {
  const sql = "SELECT* FROM announcements";
  const data = await db.query(sql);
  res.send(data.rows);
});

// GET /announcements/length - Retrieve all announcements
router.get("/length", async (req, res) => {
  const sql = "SELECT * FROM announcements";
  const data = await db.query(sql);
  const outputValue = data.rows.length;
  res.status(201).send({ dataLength: outputValue });
});

// GET /announcements/:id - Retrieve an announcement by ID
//authMiddleware,
router.get("/:id", async (req, res) => {
  const announcementId = req.params.id;
  const sql = "SELECT * FROM announcements WHERE id = $1";
  const data = await db.query(sql, [announcementId]);
  res.send(data.rows[0]);
});

// POST /announcements/new - Create a new announcement
router.post("/new", authMiddleware, (req, res) => {
  // Here you would handle creating a new announcement
  res.send("Create a new announcement");
});

// PUT /announcements/:id - Update an announcement by ID
router.put("/:id", authMiddleware, (req, res) => {
  const announcementId = req.params.id;
  // Here you would handle updating the announcement with the given ID
  res.send(`Update announcement with ID: ${announcementId}`);
});

// DELETE /announcements/:id - Delete an announcement by ID
router.delete("/:id", authMiddleware, (req, res) => {
  const announcementId = req.params.id;
  // Here you would handle deleting the announcement with the given ID
  res.send(`Delete announcement with ID: ${announcementId}`);
});

export default router;
