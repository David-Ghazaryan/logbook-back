import express from 'express';
import { pool } from '../db.js';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM archived_students ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('DB ERROR:', err);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  const { id, full_name, group_id, phone, parent_phone, birthday, admission_day, email } = req.body;
  const sql = `
    INSERT INTO archived_students 
    (stud_id, full_name, group_id, phone, parent_phone, birthday, admission_day, email) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;

  const values = [id, full_name, group_id, phone, parent_phone, birthday, admission_day, email];

  try {
    const result = await pool.query(sql, values);

    res.status(201).json({
      message: 'Student successfully archived',
      result: result.rows[0],
    });
  } catch (err) {
    console.error('SQL Error:', err.message);
    res.status(500).json({
      message: 'Failed to archive',
      error: err.message,
    });
  }
});

export default router;
