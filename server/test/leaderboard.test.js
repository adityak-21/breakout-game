import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDB, disconnectDB } from '../db.js';
process.env.NODE_ENV = 'test';

let app;
let mongoServer;

describe('Leaderboard API Integration Tests', () => {
    // Setup in-memory MongoDB server before all tests
    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        // Connect to the in-memory MongoDB
        await connectDB(mongoUri);

        // Now import the app after setting up the database
        app = (await import('../server.js')).default;
    });

    // Cleanup after all tests
    after(async () => {
        await disconnectDB();
        await mongoServer.stop();
    });

    // Optional: Clear database between tests for isolation
    beforeEach(async () => {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany({});
        }
    });

    it('should submit a new score to the leaderboard', async () => {
        const leaderboardEntry = { name: 'Jane Doe', score: 95 };
        const postRes = await request(app)
            .post('/api/leaderboard')
            .send(leaderboardEntry)
            .expect(201);
        expect(postRes.body).to.have.property('message', 'Score submitted successfully');
        expect(postRes.body.entry).to.have.property('_id');
        expect(postRes.body.entry.name).to.equal('Jane Doe');
        expect(postRes.body.entry.score).to.equal(95);
    });

    it('should retrieve the top 10 leaderboard entries', async () => {
        const leaderboardEntries = [
            { name: 'Player1', score: 100 },
            { name: 'Player2', score: 200 },
            { name: 'Player3', score: 50 }
        ];
        for (const entry of leaderboardEntries) {
            await request(app).post('/api/leaderboard').send(entry).expect(201);
        }
        const getRes = await request(app)
            .get('/')
            .expect(200);

        expect(getRes.body).to.be.an('array').that.has.lengthOf.at.most(10); 
        if (getRes.body.length >= 2) {
            expect(getRes.body[0].score).to.be.greaterThan(getRes.body[1].score); 
        }
    });
});
