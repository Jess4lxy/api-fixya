import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,  // Esto es importante para entornos como Render
    },
});

pool.on('connect', () => {
    console.log('Conexión a la base de datos establecida.');
});

pool.on('error', (err, client) => {
    console.error('Error en la conexión a la base de datos', err);
});

export default {
    query: (text, params) => pool.query(text, params),
};
