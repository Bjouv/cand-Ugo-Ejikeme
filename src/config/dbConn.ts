import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const host = process.env.DATABASE_HOST || '127.0.0.1';
        const port = process.env.DATABASE_PORT || '27017';
        const databaseName = process.env.DATABASE_NAME || 'truck_db';

        console.log(`Connecting to MongoDB at ${host}:${port}/${databaseName}`);

        const uri = process.env.DATABASE_URI || `mongodb://${host}:${port}/${databaseName}`;
        await mongoose.connect(uri, { autoIndex: false });

        mongoose.connection.once('open', () => {
            console.log('Connected to MongoDB');
        });
    } catch (err) {
        console.log('Error connecting to the database:', err);
    }
};

export default connectDB;
