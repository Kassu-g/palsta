import { Router } from 'express';
import Topic from '../models/Topic';
import { authenticateUser, authenticateAdmin } from '../middleware/validateToken';

const router = Router();

router.get('/topics', async (_, res) => {
  const topics = await Topic.find().sort({ createdAt: -1 });
  res.json(topics);
});

router.post('/topic', authenticateUser, async (req, res) => {
  const { title, content } = req.body;
  const username = (req as any).user.username;
  const topic = await Topic.create({ title, content, username });
  res.json(topic);
});
router.delete('/topic/:id', authenticateAdmin, async (req, res) => {
  await Topic.findByIdAndDelete(req.params.id);
  res.json({ message: 'Topic deleted successfully.' });
});

export default router;
