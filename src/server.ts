import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

import userRoutes from './routes/userRoutes';
import topicRoutes from './routes/topicRoutes';

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.use('/api/user', userRoutes);
app.use('/api', topicRoutes);

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Mongo connection error:', err));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
