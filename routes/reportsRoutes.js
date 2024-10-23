// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js"; // Import the middleware
// import db from "../database/db.js";

// const router = express.Router();

// // Define routes for reports

// // GET /reports - Retrieve all reports
// router.get("/", authMiddleware, (req, res) => {
//   res.send("Retrieve all reports");
// });

// // GET /reports/length - Retrieve all reports
// router.get("/length", async (req, res) => {
//   // const sql = "SELECT * FROM reports";
//   // const data = await db.query(sql);
//   // const outputValue = data.rows.length;
//   // res.status(201).send({ dataLength: outputValue });
// });

// // GET /reports/:id - Retrieve a user by ID
// router.get("/:id", authMiddleware, (req, res) => {
//   const userId = req.params.id;
//   res.send(`Retrieve report with ID: ${userId}`);
// });

// // POST /reports/new - Create a new user
// router.post("/new", authMiddleware, (req, res) => {
//   // Here you would handle creating a new user
//   res.send("Create a new report");
// });

// // PUT /reports/:id - Update a user by ID
// router.put("/:id", authMiddleware, (req, res) => {
//   const userId = req.params.id;
//   // Here you would handle updating the user with the given ID
//   res.send(`Update report with ID: ${userId}`);
// });

// // DELETE /reports/:id - Delete a user by ID
// router.delete("/:id", authMiddleware, (req, res) => {
//   const userId = req.params.id;
//   // Here you would handle deleting the user with the given ID
//   res.send(`Delete report with ID: ${userId}`);
// });

// export default router;
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js"); // Import the middleware
const db = require("../database/db.js");

const router = express.Router();

// Define routes for reports

// GET /reports - Retrieve all reports
router.get("/", authMiddleware, async (req, res) => {
  try {
    const sql = "SELECT * FROM reports"; // Replace with actual query
    const data = await db.query(sql);
    res.send(data.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

// GET /reports/length - Retrieve the number of reports
router.get("/length", async (req, res) => {
  try {
    const sql = "SELECT * FROM reports";
    const data = await db.query(sql);
    const outputValue = data.rows.length;
    res.status(200).send({ dataLength: outputValue });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

// GET /reports/:id - Retrieve a report by ID
router.get("/:id", authMiddleware, async (req, res) => {
  const reportId = req.params.id;
  try {
    const sql = "SELECT * FROM reports WHERE id = $1";
    const data = await db.query(sql, [reportId]);

    if (data.rows.length === 0) {
      return res.status(404).send({ message: "Report not found" });
    }

    res.send(data.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

// POST /reports/new - Create a new report
router.post("/new", authMiddleware, async (req, res) => {
  const { title, content, created_by } = req.body; // Example fields
  try {
    const sql = "INSERT INTO reports (title, content, created_by) VALUES ($1, $2, $3)";
    await db.query(sql, [title, content, created_by]);
    res.status(201).send({ message: "Report created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

// PUT /reports/:id - Update a report by ID
router.put("/:id", authMiddleware, async (req, res) => {
  const reportId = req.params.id;
  const { title, content } = req.body; // Example fields

  try {
    const sql = "UPDATE reports SET title = $1, content = $2 WHERE id = $3 RETURNING *";
    const result = await db.query(sql, [title, content, reportId]);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Report not found" });
    }

    res.send({ message: "Report updated successfully", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

// DELETE /reports/:id - Delete a report by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  const reportId = req.params.id;

  try {
    const sql = "DELETE FROM reports WHERE id = $1 RETURNING *";
    const result = await db.query(sql, [reportId]);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Report not found" });
    }

    res.send({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
