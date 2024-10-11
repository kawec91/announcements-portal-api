import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // Import the middleware
import multer from "multer";
import db from "../database/db.js";

const router = express.Router();

//STORAGE
// Set storage engine using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/docs/"); // Upload files to /docs/
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Prepend timestamp to avoid duplicates
  },
});

const upload = multer({ storage: storage });

// POST endpoint for uploading a document
// /formulars/upload
router.post(
  "/upload",
  authMiddleware,
  upload.single("document"),
  async (req, res) => {
    const { title, description } = req.body;

    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileUrl = path.join("/uploads/docs", req.file.filename);

      // Save file information and form data in the database
      const sql = `
      INSERT INTO formulars (title, file_url, description)
      VALUES ($1, $2, $3) RETURNING *;
    `;
      const values = [title, fileUrl, description, created_by, lastmodify_by];

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

export default router;
