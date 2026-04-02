import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Get all attendance
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM attendance ORDER BY date, student_id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Add / update attendance
router.post("/", async (req, res) => {
  const { student_id, date, status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO attendance (student_id, date, status)
       VALUES ($1, $2, $3)
       ON CONFLICT (student_id, date) DO UPDATE SET status = $3
       RETURNING *`,
      [student_id, date, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;