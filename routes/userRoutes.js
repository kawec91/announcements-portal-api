import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // Import the middleware
import db from "../database/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

// Define routes for users

// GET /users - Retrieve all users
//authMiddleware,
router.get("/", async (req, res) => {
  const sql = "SELECT id, username, email, role FROM Users";
  const data = await db.query(sql);
  res.send(data.rows);
});

// GET /users/length - Retrieve all users
router.get("/length", async (req, res) => {
  const sql = "SELECT * FROM users";
  const data = await db.query(sql);
  const outputValue = data.rows.length;
  res.status(201).send({ dataLength: outputValue });
});
// GET /users/admin/length - Retrieve all admin users
router.get("/admin/length", async (req, res) => {
  const sql = "SELECT * FROM users WHERE role = 'admin'";
  const data = await db.query(sql);
  const outputValue = data.rows.length;
  res.status(201).send({ dataLength: outputValue });
});
// GET /users/member/length - Retrieve all member users
router.get("/member/length", async (req, res) => {
  const sql = "SELECT * FROM users WHERE role = 'member'";
  const data = await db.query(sql);
  const outputValue = data.rows.length;
  res.status(201).send({ dataLength: outputValue });
});
// GET /users/user/length - Retrieve all user users
router.get("/user/length", async (req, res) => {
  const sql = "SELECT * FROM users WHERE role = 'user'";
  const data = await db.query(sql);
  const outputValue = data.rows.length;
  res.status(201).send({ dataLength: outputValue });
});

// GET /users/:id - Retrieve a user by ID
router.get("/:id", authMiddleware, async (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT * FROM users WHERE id = $1`;
  const data = await db.query(sql, [userId]);

  // Check if a user is found
  if (data.rows.length === 0) {
    return res.status(404).send({ error: "User not found" });
  }

  const user = data.rows[0];
  // Delete the password field
  delete user.password;

  res.send(user);
});

// POST /users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //Find user in db
  const sql = `SELECT * FROM users WHERE email = $1`;
  const data = await db.query(sql, [email]);
  const user = data.rows[0];

  console.log(user);
  //When there is no user in db
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //Simply password validation
  if (password !== user.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //Check password using bcrypt
  //const isPasswordValid = bcrypt.compareSync(password, user.password);

  //When password is invalid
  // if (!isPasswordValid) {
  //   return res.status(401).json({ message: "Invalid credentials" });
  // }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" } // Token expires in 8 hour
  );

  // Send the token as a response
  return res.json({
    message: "Login successful",
    token,
  });
});

// POST /users/new - Create a new user
router.post("/new", async (req, res) => {
  console.log("servdata", req.body);
  //Collect data
  const { username, email, password } = req.body;
  try {
    // Use parameterized queries to prevent SQL injection
    const sql = `INSERT INTO users (username, email, password, role) VALUES ($1,$2,$3,$4)`;

    // Execute the SQL query with values (use your db method to execute the query)
    const result = await db.query(sql, [username, email, password, "user"]);
    //
    console.log(result);
    //ServerResponse
    res.status(201).send({ message: "Użytkownik został zarejestrowany" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
});

// PUT /users/:id - Update a user by ID
//authMiddleware,
router.put("/:id", async (req, res) => {
  const userId = req.params.id;

  //Collect
  const { userRole } = req.body;

  try {
    const sql = `UPDATE users SET role = $1 WHERE id = $2 RETURNING id, role`;

    const result = await db.query(sql, [userRole, userId]);
    //
    console.log(result);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: "No user found with this ID" });
    }

    //ServerResponse
    res.send({
      message: `Updated user with ID: ${userId}`,
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
});

// DELETE /users/:id - Delete a user by ID
// authMiddleware,
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const sql = `DELETE FROM
            users
        WHERE
            id = $1
        RETURNING *`;

    const result = await db.query(sql, [userId]);
    console.log(`DELETING`, result);
    //ServerResponse
    res.send({ message: "User Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
});

export default router;
