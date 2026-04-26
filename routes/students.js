import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students;');
    res.json(result.rows);
  } catch (err) {
    console.error('DB ERROR:', err);
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
  const { full_name, phone, parent_phone, birthday, admission_day, email } = req.body;

  if (!full_name || !phone) {
    return res.status(400).json({ message: 'Full name and phone are required' });
  }

  try {
    const query = `
      INSERT INTO students (full_name, phone, parent_phone, birthday, admission_day, email)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [full_name, phone, parent_phone, birthday, admission_day, email];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('DB INSERT ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/:id', async (req, res) => {
  console.log('DELETED');
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Not Found' });
    }

    res.json({ message: 'Deleted', student: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
