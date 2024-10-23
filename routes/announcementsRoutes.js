// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js"; // Import the middleware
// import db from "../database/db.js";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// // Create __dirname equivalent for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const router = express.Router();

// // Ensure uploads directory exists
// const uploadDir = path.join(__dirname, "../uploads/images");
// console.log(`Upload directory path: ${uploadDir}`);

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
//   console.log(`Directory created: ${uploadDir}`);
// } else {
//   console.log(`Directory already exists: ${uploadDir}`);
// }

// // Set storage engine using multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(`Storing file to: ${uploadDir}`);
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const filename = `${Date.now()}-${file.originalname}`;
//     console.log(`Generated filename: ${filename}`);
//     cb(null, filename);
//   },
// });

// const upload = multer({ storage: storage });

// // Define routes for announcements

// // GET /announcements - Retrieve all announcements
// //authMiddleware,
// router.get("/", async (req, res) => {
//   const sql = "SELECT* FROM announcements";
//   const data = await db.query(sql);
//   return res.send(data.rows);
// });

// // GET /announcements/length - Retrieve all announcements
// router.get("/length", async (req, res) => {
//   const sql = "SELECT * FROM announcements";
//   const data = await db.query(sql);
//   const outputValue = data.rows.length;
//   return res.status(201).send({ dataLength: outputValue });
// });

// // GET /announcements/:id - Retrieve an announcement by ID
// //authMiddleware,
// router.get("/:id", async (req, res) => {
//   const announcementId = req.params.id;
//   const sql = "SELECT * FROM announcements WHERE id = $1";
//   const data = await db.query(sql, [announcementId]);
//   return res.send(data.rows[0]);
// });

// // POST /announcements/new - Create a new announcement
// router.post(
//   "/new",
//   authMiddleware,
//   upload.single("image_path"),
//   async (req, res) => {
//     console.log("servdata", req.body);
//     const { title, salary, location, description, created_by, lastmodify_by } =
//       req.body;
//     try {
//       if (!req.file) {
//         console.error("No file uploaded");
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       const fileUrl = path.join("/uploads/images", req.file.filename).replace(/\\/g, '/');

//       console.log(`File uploaded successfully: ${fileUrl}`);

//       const sql = `INSERT INTO
//     announcements (title, salary, location, description, image_path, created_by, lastmodify_by)
//       VALUES ($1, $2, $3, $4, $5, $6, $7)`;

//       const result = await db.query(sql, [
//         title,
//         salary,
//         location,
//         description,
//         fileUrl,
//         created_by,
//         lastmodify_by,
//       ]);
//       console.log(`ADDING`, result);
//       //ServerResponse
//       return res.send({ message: "Announcement ADDED" });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send({ message: "Server Error" });
//     }
//   }
// );

// // PUT /announcements/:id - Update an announcement by ID
// router.put("/:id", authMiddleware, (req, res) => {
//   const announcementId = req.params.id;
//   // Here you would handle updating the announcement with the given ID
//   res.send(`Update announcement with ID: ${announcementId}`);
// });

// // DELETE /announcements/:id - Delete an announcement by ID
// router.delete("/:id", authMiddleware, async (req, res) => {
//   const announcementId = req.params.id;

//   try {
//     const sql = `DELETE FROM
//     announcements
//       WHERE
//           id = $1
//       RETURNING *`;

//     const result = await db.query(sql, [announcementId]);

//     if (result.rowCount === 0) {
//       return res.status(404).send({ message: "Announcement not found" });
//     }

//     console.log(`DELETING`, result);
//     //ServerResponse
//     return res.send({ message: "Announcement Deleted" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ message: "Server Error" });
//   }
// });

// export default router;

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js"); // Import the middleware
const db = require("../database/db.js");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Create upload directory
const uploadDir = path.join(__dirname, "../uploads/images");
console.log(`Upload directory path: ${uploadDir}`);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Directory created: ${uploadDir}`);
} else {
  console.log(`Directory already exists: ${uploadDir}`);
}

// Set storage engine using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`Storing file to: ${uploadDir}`);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    console.log(`Generated filename: ${filename}`);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

// Define routes for announcements

// GET /announcements - Retrieve all announcements
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM announcements";
  const data = await db.query(sql);
  return res.send(data.rows);
});

// GET /announcements/length - Retrieve all announcements
router.get("/length", async (req, res) => {
  const sql = "SELECT * FROM announcements";
  const data = await db.query(sql);
  const outputValue = data.rows.length;
  return res.status(201).send({ dataLength: outputValue });
});

// GET /announcements/:id - Retrieve an announcement by ID
router.get("/:id", async (req, res) => {
  const announcementId = req.params.id;
  const sql = "SELECT * FROM announcements WHERE id = $1";
  const data = await db.query(sql, [announcementId]);
  if (data.rows.length === 0) {
    return res.status(404).send({ error: "Announcement not found" });
  }
  return res.send(data.rows[0]);
});

// POST /announcements/new - Create a new announcement
router.post(
  "/new",
  authMiddleware,
  upload.single("image_path"),
  async (req, res) => {
    console.log("servdata", req.body);
    const { title, salary, location, description, created_by, lastmodify_by } =
      req.body;

    try {
      if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileUrl = path
        .join("/uploads/images", req.file.filename)
        .replace(/\\/g, "/");
      console.log(`File uploaded successfully: ${fileUrl}`);

      const sql = `INSERT INTO announcements (title, salary, location, description, image_path, created_by, lastmodify_by)
                   VALUES ($1, $2, $3, $4, $5, $6, $7)`;

      const result = await db.query(sql, [
        title,
        salary,
        location,
        description,
        fileUrl,
        created_by,
        lastmodify_by,
      ]);
      console.log(`ADDING`, result);
      return res.send({ message: "Announcement ADDED" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Server Error" });
    }
  }
);

// PUT /announcements/:id - Update an announcement by ID
router.put("/:id", authMiddleware, async (req, res) => {
  const announcementId = req.params.id;
  // Handle updating the announcement (implementation not shown here)
  res.send(`Update announcement with ID: ${announcementId}`);
});

// DELETE /announcements/:id - Delete an announcement by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  const announcementId = req.params.id;

  try {
    const sql = `DELETE FROM announcements WHERE id = $1 RETURNING *`;
    const result = await db.query(sql, [announcementId]);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Announcement not found" });
    }

    console.log(`DELETING`, result);
    return res.send({ message: "Announcement Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
