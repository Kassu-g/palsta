"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Topic_1 = __importDefault(require("../models/Topic"));
const validateToken_1 = require("../middleware/validateToken");
const router = (0, express_1.Router)();
// GET /api/topics
router.get('/topics', async (_, res) => {
    const topics = await Topic_1.default.find().sort({ createdAt: -1 });
    res.json(topics);
});
// POST /api/topic  (any logged-in user)
router.post('/topic', validateToken_1.authenticateUser, async (req, res) => {
    const { title, content } = req.body;
    const username = req.user.username;
    const topic = await Topic_1.default.create({ title, content, username });
    res.json(topic);
});
// DELETE /api/topic/:id  (admin only)
router.delete('/topic/:id', validateToken_1.authenticateAdmin, async (req, res) => {
    await Topic_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: 'Topic deleted successfully.' });
});
exports.default = router;
