import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // Import the middleware
import db from "../database/db.js";

const router = express.Router();

// Define routes for aplications

// GET /aplications - Retrieve new aplications
//authMiddleware,
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
  const data = await db.query(sql, ["new"]);
  res.send(data.rows);
});
// GET /aplications/new - Retrieve new aplications
//authMiddleware,
router.get("/new", async (req, res) => {
  const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
  const data = await db.query(sql, ["new"]);
  res.send(data.rows);
});
// GET /aplications/new/length - Retrieve new aplications
//authMiddleware,
router.get("/new/length", async (req, res) => {
  const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
  const data = await db.query(sql, ["new"]);
  const dataLength = data.rows.length || 0;
  res.send({ dataLength: dataLength });
});
// GET /aplications/inprogress - Retrieve inprogress aplications
//authMiddleware,
router.get("/inprogress", async (req, res) => {
  const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
  const data = await db.query(sql, ["inprogress"]);
  res.send(data.rows);
});
// GET /aplications/inprogress/length - Retrieve inprogress aplications
//authMiddleware,
router.get("/inprogress/length", async (req, res) => {
  const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
  const data = await db.query(sql, ["inprogress"]);
  const dataLength = data.rows.length || 0;
  res.send({ dataLength: dataLength });
});
// GET /aplications/accepted - Retrieve accepted aplications
//authMiddleware,
router.get("/accepted", async (req, res) => {
  const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
  const data = await db.query(sql, ["accepted"]);
  res.send(data.rows);
});
// GET /aplications/accepted/length - Retrieve accepted aplications
//authMiddleware,
router.get("/accepted/length", async (req, res) => {
  const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
  const data = await db.query(sql, ["accepted"]);
  const dataLength = data.rows.length || 0;
  res.send({ dataLength: dataLength });
});
// GET /aplications/rejected - Retrieve rejected aplications
//authMiddleware,
router.get("/rejected", async (req, res) => {
  const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
  const data = await db.query(sql, ["rejected"]);
  res.send(data.rows);
});
// GET /aplications/rejected/length - Retrieve rejected aplications
//authMiddleware,
router.get("/rejected/length", async (req, res) => {
  const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
  const data = await db.query(sql, ["rejected"]);
  const dataLength = data.rows.length || 0;
  res.send({ dataLength: dataLength });
});

// GET /aplications/length - Retrieve all aplications
router.get("/length", async (req, res) => {
  const sql = "SELECT * FROM aplications";
  const data = await db.query(sql);
  const outputValue = data.rows.length;
  res.status(201).send({ dataLength: outputValue });
});

// GET /aplications/:id - Retrieve a user by ID
router.get("/:id", authMiddleware, (req, res) => {
  const userId = req.params.id;
  res.send(`Retrieve report with ID: ${userId}`);
});

// POST /aplications/new - Create a new user
router.post("/new", authMiddleware, (req, res) => {
  // Here you would handle creating a new user
  res.send("Create a new aplication");
});

// PUT /aplications/:id - Update a user by ID
//authMiddleware,
router.put("/:id", async (req, res) => {
  const aplicationId = req.params.id;
  const { testday_date, fdp, bs, student_id } = req.body;
  try {
    const sql = `UPDATE aplications SET testday_date = $2, fdp = $3, bs = $4, student_id = $5, lastmodify_at = NOW() WHERE id = $1 RETURNING *`;

    const result = await db.query(sql, [
      aplicationId,
      testday_date,
      fdp,
      bs,
      student_id,
    ]);
    //
    console.log(result);
    //
    res.send({ message: "Aplication successfully rejected." });
  } catch (error) {
    res.send(error);
  }
});
// PUT /aplications/:id/status - Update a user by ID
//authMiddleware,
router.put("/:id/status", async (req, res) => {
  const aplicationId = req.params.id;
  const { aplicatoin_status } = req.body;

  try {
    const sql = `UPDATE aplications SET aplication_status = $1, lastmodify_at = NOW() WHERE id = $2 RETURNING *`;

    const result = await db.query(sql, [aplicatoin_status, aplicationId]);
    //
    console.log(result);
    //
    res.send({ message: "Aplication successfully rejected." });
  } catch (error) {
    res.send(error);
  }
});

// DELETE /aplications/:id - Delete a user by ID
router.delete("/:id", authMiddleware, (req, res) => {
  const aplicationId = req.params.id;
  // Here you would handle deleting the user with the given ID
  res.send(`Delete aplication with ID: ${aplicationId}`);
});

export default router;
