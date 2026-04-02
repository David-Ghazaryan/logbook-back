import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('REQUEST HIT');

    const result = await pool.query('SELECT * FROM students');

    console.log(result.rows);

    res.json(result.rows);
  } catch (err) {
    console.error('DB ERROR:', err);
    res.status(500).send('Server error');
  }
});

export default router;
