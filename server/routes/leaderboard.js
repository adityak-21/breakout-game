import express from 'express';
import Leaderboard from '../models/leaderboard.js';  
const router = express.Router();
router.post('/api/leaderboard', async (req, res) => {
    console.log("called");
    try {
        const { name, score } = req.body;
        const newEntry = new Leaderboard({ name, score });
        await newEntry.save();
        res.status(201).json({ message: 'Score submitted successfully', entry: newEntry });
    } catch (error) {
        console.error('Error submitting score:', error);
        res.status(500).json({ error: 'Failed to submit score' });
    }
});
router.get('/', async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);
        console.log(leaderboard);
        res.json(leaderboard);
    } catch (error) {
        console.error('Error retrieving leaderboard:', error);
        res.status(500).json({ error: 'Failed to retrieve leaderboard' });
    }
});
export default router;  