import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const db = new Client({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export const connectDB = async (): Promise<void> => {
    try {
        await db.connect();
        console.log('Connected to the PostgreSQL database.');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
};
