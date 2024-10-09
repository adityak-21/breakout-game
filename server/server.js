import express from 'express';
import { connectDB } from './db.js';
import leaderboardRoutes from './routes/leaderboard.js';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 3000;


app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use('/', leaderboardRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
        process.on('SIGINT', async () => {
            console.log('\nGracefully shutting down...');
            await mongoose.connection.close();
            console.log('MongoDB connection closed.');
            process.exit(0);
        });

    } catch (err) {
        console.error('Failed to start the server:', err);
        process.exit(1); 
    }
};

if (process.env.NODE_ENV !== 'test') {
    startServer();
}

export default app;
