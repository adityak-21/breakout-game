import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDB, disconnectDB } from '../db.js';

describe('Database Connection Tests', function () {
    let mongoServer;

    before(async function () {
        // Setup in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();
    });

    after(async function () {
        await mongoServer.stop();
    });

    it('should connect to the in-memory MongoDB', async function () {
        const uri = mongoServer.getUri();
        await connectDB(uri);
        expect(mongoose.connection.readyState).to.equal(1); // 1 = connected
    });

    it('should disconnect from the MongoDB', async function () {
        await disconnectDB();
        expect(mongoose.connection.readyState).to.equal(0); // 0 = disconnected
    });
});
