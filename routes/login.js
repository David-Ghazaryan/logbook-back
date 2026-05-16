import express from 'express';
import { pool } from '../db.js';

const router = express.Router();
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password],
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Օգտատերը կամ պարոլը սխալ է' });
    }

    const user = userResult.rows[0];

    res.json({
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Սերվերի սխալ տեղի ունեցավ' });
  }
});
export default router;
