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
// const uploadDir = path.join(__dirname, "../uploads/cv");
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

// // Define routes for aplications

// // GET /aplications - Retrieve new aplications
// //authMiddleware,
// router.get("/", async (req, res) => {
//   const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
//   const data = await db.query(sql, ["new"]);
//   res.send(data.rows);
// });
// // GET /aplications/new - Retrieve new aplications
// //authMiddleware,
// router.get("/new", async (req, res) => {
//   const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
//   const data = await db.query(sql, ["new"]);
//   res.send(data.rows);
// });
// // GET /aplications/new/length - Retrieve new aplications
// //authMiddleware,
// router.get("/new/length", async (req, res) => {
//   const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
//   const data = await db.query(sql, ["new"]);
//   const dataLength = data.rows.length || 0;
//   res.send({ dataLength: dataLength });
// });
// // GET /aplications/inprogress - Retrieve inprogress aplications
// //authMiddleware,
// router.get("/inprogress", async (req, res) => {
//   const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
//   const data = await db.query(sql, ["inprogress"]);
//   res.send(data.rows);
// });
// // GET /aplications/inprogress/length - Retrieve inprogress aplications
// //authMiddleware,
// router.get("/inprogress/length", async (req, res) => {
//   const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
//   const data = await db.query(sql, ["inprogress"]);
//   const dataLength = data.rows.length || 0;
//   res.send({ dataLength: dataLength });
// });
// // GET /aplications/accepted - Retrieve accepted aplications
// //authMiddleware,
// router.get("/accepted", async (req, res) => {
//   const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
//   const data = await db.query(sql, ["accepted"]);
//   res.send(data.rows);
// });
// // GET /aplications/accepted/length - Retrieve accepted aplications
// //authMiddleware,
// router.get("/accepted/length", async (req, res) => {
//   const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
//   const data = await db.query(sql, ["accepted"]);
//   const dataLength = data.rows.length || 0;
//   res.send({ dataLength: dataLength });
// });
// // GET /aplications/rejected - Retrieve rejected aplications
// //authMiddleware,
// router.get("/rejected", async (req, res) => {
//   const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
//   const data = await db.query(sql, ["rejected"]);
//   res.send(data.rows);
// });
// // GET /aplications/rejected/length - Retrieve rejected aplications
// //authMiddleware,
// router.get("/rejected/length", async (req, res) => {
//   const sql = "SELECT * FROM aplications WHERE aplication_status = $1";
//   const data = await db.query(sql, ["rejected"]);
//   const dataLength = data.rows.length || 0;
//   res.send({ dataLength: dataLength });
// });

// // GET /aplications/length - Retrieve all aplications
// router.get("/length", async (req, res) => {
//   const sql = "SELECT * FROM aplications";
//   const data = await db.query(sql);
//   const outputValue = data.rows.length;
//   res.status(201).send({ dataLength: outputValue });
// });

// // GET /aplications/:id - Retrieve a user by ID
// router.get("/:id", authMiddleware, (req, res) => {
//   const userId = req.params.id;
//   res.send(`Retrieve report with ID: ${userId}`);
// });

// // POST /aplications/new - Create a new user
// router.post(
//   "/new",
//   authMiddleware,
//   upload.single("file_path"),
//   async (req, res) => {
//     console.log("Received request: ", req.body);
//     console.log("Received file: ", req.file);
//     const {
//       username,
//       aplication_status,
//       created_by,
//       lastmodify_by,
//       aplication_title,
//     } = req.body;

//     try {
//       if (!req.file) {
//         console.error("No file uploaded");
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       const fileUrl = path
//         .join("/uploads/cv", req.file.filename)
//         .replace(/\\/g, "/");

//       console.log(`File uploaded successfully: ${fileUrl}`);

//       const sql = `INSERT INTO
//   aplications (username, aplication_status, aplication_title, created_by, lastmodify_by, file_path)
//     VALUES ($1, $2, $3, $4, $5, $6)`;

//       const result = await db.query(sql, [
//         username,
//         aplication_status,
//         created_by,
//         lastmodify_by,
//         aplication_title,
//         fileUrl,
//       ]);
//       console.log(`Aplication add`, result);
//       //ServerResponse
//       return res.send({ message: "Aplication ADDED" });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).send({ message: "Server Error" });
//     }
//   }
// );

// // PUT /aplications/:id - Update a user by ID
// //authMiddleware,
// router.put("/:id", async (req, res) => {
//   const aplicationId = req.params.id;
//   const { testday_date, fdp, bs, student_id } = req.body;
//   try {
//     const sql = `UPDATE aplications SET testday_date = $2, fdp = $3, bs = $4, student_id = $5, lastmodify_at = NOW() WHERE id = $1 RETURNING *`;

//     const result = await db.query(sql, [
//       aplicationId,
//       testday_date,
//       fdp,
//       bs,
//       student_id,
//     ]);
//     //
//     console.log(result);
//     //
//     res.send({ message: "Aplication successfully rejected." });
//   } catch (error) {
//     res.send(error);
//   }
// });
// // PUT /aplications/:id/status - Update a user by ID
// //authMiddleware,
// router.put("/:id/status", async (req, res) => {
//   const aplicationId = req.params.id;
//   const { aplicatoin_status } = req.body;

//   try {
//     const sql = `UPDATE aplications SET aplication_status = $1, lastmodify_at = NOW() WHERE id = $2 RETURNING *`;

//     const result = await db.query(sql, [aplicatoin_status, aplicationId]);
//     //
//     console.log(result);
//     //
//     res.send({ message: "Aplication successfully rejected." });
//   } catch (error) {
//     res.send(error);
//   }
// });

// // DELETE /aplications/:id - Delete a user by ID
// router.delete("/:id", authMiddleware, (req, res) => {
//   const aplicationId = req.params.id;
//   // Here you would handle deleting the user with the given ID
//   res.send(`Delete aplication with ID: ${aplicationId}`);
// });

// export default router;

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const db = require("../database/db.js");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads/cv");
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

// Define routes for applications

// GET /applications - Retrieve new applications
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM applications WHERE application_status = $1";
  const data = await db.query(sql, ["new"]);
  res.send(data.rows);
});

// GET /applications/new - Retrieve new applications
router.get("/new", async (req, res) => {
  const sql = "SELECT * FROM applications WHERE application_status = $1";
  const data = await db.query(sql, ["new"]);
  res.send(data.rows);
});

// GET /applications/new/length - Retrieve the length of new applications
router.get("/new/length", async (req, res) => {
  const sql = "SELECT * FROM applications WHERE application_status = $1";
  const data = await db.query(sql, ["new"]);
  res.send({ dataLength: data.rows.length || 0 });
});

// GET /applications/inprogress - Retrieve in-progress applications
router.get("/inprogress", async (req, res) => {
  const sql = "SELECT * FROM applications WHERE application_status = $1";
  const data = await db.query(sql, ["inprogress"]);
  res.send(data.rows);
});

// GET /applications/inprogress/length - Retrieve the length of in-progress applications
router.get("/inprogress/length", async (req, res) => {
  const sql = "SELECT * FROM applications WHERE application_status = $1";
  const data = await db.query(sql, ["inprogress"]);
  res.send({ dataLength: data.rows.length || 0 });
});

// GET /applications/accepted - Retrieve accepted applications
router.get("/accepted", async (req, res) => {
  const sql = "SELECT * FROM applications WHERE application_status = $1";
  const data = await db.query(sql, ["accepted"]);
  res.send(data.rows);
});

// GET /applications/accepted/length - Retrieve the length of accepted applications
router.get("/accepted/length", async (req, res) => {
  const sql = "SELECT * FROM applications WHERE application_status = $1";
  const data = await db.query(sql, ["accepted"]);
  res.send({ dataLength: data.rows.length || 0 });
});

// GET /applications/rejected - Retrieve rejected applications
router.get("/rejected", async (req, res) => {
  const sql = "SELECT * FROM applications WHERE application_status = $1";
  const data = await db.query(sql, ["rejected"]);
  res.send(data.rows);
});

// GET /applications/rejected/length - Retrieve the length of rejected applications
router.get("/rejected/length", async (req, res) => {
  const sql = "SELECT * FROM applications WHERE application_status = $1";
  const data = await db.query(sql, ["rejected"]);
  res.send({ dataLength: data.rows.length || 0 });
});

// GET /applications/length - Retrieve the total number of applications
router.get("/length", async (req, res) => {
  const sql = "SELECT * FROM applications";
  const data = await db.query(sql);
  res.send({ dataLength: data.rows.length });
});

// GET /applications/:id - Retrieve an application by ID
router.get("/:id", authMiddleware, async (req, res) => {
  const applicationId = req.params.id;
  const sql = "SELECT * FROM applications WHERE id = $1";
  const data = await db.query(sql, [applicationId]);

  if (data.rows.length === 0) {
    return res.status(404).send({ message: "Application not found" });
  }

  res.send(data.rows[0]);
});

// POST /applications/new - Create a new application
router.post(
  "/new",
  authMiddleware,
  upload.single("file_path"),
  async (req, res) => {
    console.log("Received request: ", req.body);
    console.log("Received file: ", req.file);

    const {
      username,
      application_status,
      created_by,
      lastmodify_by,
      application_title,
    } = req.body;

    try {
      if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileUrl = path
        .join("/uploads/cv", req.file.filename)
        .replace(/\\/g, "/");

      console.log(`File uploaded successfully: ${fileUrl}`);

      const sql = `INSERT INTO applications (username, application_status, application_title, created_by, lastmodify_by, file_path) VALUES ($1, $2, $3, $4, $5, $6)`;
      await db.query(sql, [
        username,
        application_status,
        application_title,
        created_by,
        lastmodify_by,
        fileUrl,
      ]);

      return res.send({ message: "Application ADDED" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Server Error" });
    }
  }
);

// PUT /applications/:id - Update an application by ID
router.put("/:id", authMiddleware, async (req, res) => {
  const applicationId = req.params.id;
  const { testday_date, fdp, bs, student_id } = req.body;

  try {
    const sql = `UPDATE applications SET testday_date = $1, fdp = $2, bs = $3, student_id = $4, lastmodify_at = NOW() WHERE id = $5 RETURNING *`;
    const result = await db.query(sql, [
      testday_date,
      fdp,
      bs,
      student_id,
      applicationId,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Application not found" });
    }

    res.send({ message: "Application successfully updated." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

// PUT /applications/:id/status - Update the status of an application
router.put("/:id/status", authMiddleware, async (req, res) => {
  const applicationId = req.params.id;
  const { application_status } = req.body;

  try {
    const sql = `UPDATE applications SET application_status = $1, lastmodify_at = NOW() WHERE id = $2 RETURNING *`;
    const result = await db.query(sql, [application_status, applicationId]);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Application not found" });
    }

    res.send({ message: "Application status successfully updated." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

// DELETE /applications/:id - Delete an application by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  const applicationId = req.params.id;

  try {
    const sql = `DELETE FROM applications WHERE id = $1 RETURNING *`;
    const result = await db.query(sql, [applicationId]);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "Application not found" });
    }

    res.send({ message: "Application deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
});

module.exports = router;
