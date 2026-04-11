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
