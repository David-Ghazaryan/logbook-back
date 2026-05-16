import express from 'express';
import cors from 'cors';
import studentsRoutes from './routes/students.js';
import attendanceRoutes from './routes/attendance.js';
import archivedStudentsRoutes from './routes/archivedStudents.js';
import loginRoutes from './routes/login.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/students', studentsRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/archive', archivedStudentsRoutes);
app.use('/login', loginRoutes);

app.listen(5005, () => console.log('Server running on http://localhost:5005'));
