// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import multer from "multer";
// import db from "../database/db.js";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// // Create __dirname equivalent for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const router = express.Router();

// // Ensure uploads directory exists
// const uploadDir = path.join(__dirname, "../uploads/docs");
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

// router.post(
//   "/upload",
//   authMiddleware,
//   upload.single("document"),
//   async (req, res) => {
//     const { title, description } = req.body;
//     try {
//       if (!req.file) {
//         console.error("No file uploaded");
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       const fileUrl = path
//         .join("/uploads/docs", req.file.filename)
//         .replace(/\\/g, "/");

//       console.log(`File uploaded successfully: ${fileUrl}`);

//       const sql = `
//       INSERT INTO formulars (title, file_url, description, created_by, lastmodify_by)
//       VALUES ($1, $2, $3, $4, $5) RETURNING *;
//     `;
//       const values = [title, fileUrl, description, req.user.id, req.user.id];
//       const result = await db.query(sql, values);
//       const newFormular = result.rows[0];

//       res.status(200).json({
//         message: "File uploaded and data saved successfully",
//         data: newFormular,
//       });
//     } catch (error) {
//       console.error("Error uploading file or saving data:", error);
//       res.status(500).json({ error: "Failed to upload file and save data" });
//     }
//   }
// );

// export default router;

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const multer = require("multer");
const db = require("../database/db.js");
const fs = require("fs");
const path = require("path");

// No need to declare __filename or __dirname
const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads/docs");
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

router.post(
  "/upload",
  authMiddleware,
  upload.single("document"),
  async (req, res) => {
    const { title, description } = req.body;
    try {
      if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileUrl = path
        .join("/uploads/docs", req.file.filename)
        .replace(/\\/g, "/");

      console.log(`File uploaded successfully: ${fileUrl}`);

      const sql = `
      INSERT INTO formulars (title, file_url, description, created_by, lastmodify_by)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
      const values = [title, fileUrl, description, req.user.id, req.user.id];
      const result = await db.query(sql, values);
      const newFormular = result.rows[0];

      res.status(200).json({
        message: "File uploaded and data saved successfully",
        data: newFormular,
      });
    } catch (error) {
      console.error("Error uploading file or saving data:", error);
      res.status(500).json({ error: "Failed to upload file and save data" });
    }
  }
);

module.exports = router;
