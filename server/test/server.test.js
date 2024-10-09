import request from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server.js';
import { connectDB, disconnectDB } from '../db.js';

describe('Server Integration Tests', function () {
    let mongoServer;

    before(async function () {
        // Setup in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await connectDB(uri);
    });

    after(async function () {
        await disconnectDB();
        await mongoServer.stop();
    });

    it('should respond with 404 for unknown routes', async function () {
        const res = await request(app)
            .get('/unknown-route')
            .expect(404); // Expect a 404 status
    
        expect(res.body).to.deep.equal({}); // 404 may not have any body
    });
    

    it('should handle errors with the error-handling middleware', async function () {
        app.get('/trigger-error', (req, res, next) => {
            const err = new Error('Test Error');
            err.status = 500;
            next(err);
        });
    
        const res = await request(app)
            .get('/trigger-error')
            .expect(500); // Expecting a 500 error
    
            expect(res.body).to.deep.equal({});  // Checking the error message
    });
    
});
