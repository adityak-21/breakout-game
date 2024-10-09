import mongoose from 'mongoose';
const defaultDbURI = process.env.MONGO_URI || 'mongodb+srv://kartik18badmera:95Gyw7FdB9lsIkQ4@leaderboard.emzxu.mongodb.net/?retryWrites=true&w=majority&appName=Leaderboard';
export const connectDB = async (uri = defaultDbURI) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error disconnecting from MongoDB:', err);
    }
};
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});
