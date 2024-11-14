import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import residentRoutes from './controllers/residentController.js';
import authRoutes from './routes/authRoutes.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import db from './data/database.js';

dotenv.config();

const app = express();

// Inicializar conexión con la base de datos PostgreSQL
const initializeDBConnection = async () => {
    try {
        const res = await db.query('SELECT NOW()');
        console.log('Conexión a la base de datos establecida:', res.rows[0]);
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); // Salir si no se puede conectar
    }
};

await initializeDBConnection();

// CORS middleware
app.use(cors({ origin: ['https://api-fixya.onrender.com', 'http://localhost:3000'] }));

// Middleware de Morgan para logging de peticiones HTTP
app.use(morgan('dev'));

// Middleware de Body-parser
app.use(bodyParser.urlencoded({ extended: true })); // para datos codificados en url
app.use(bodyParser.json()); // para parsear JSON en el cuerpo de las solicitudes
app.use(express.json()); // Middleware nativo

// Middleware personalizado para loguear solicitudes
const logRequest = (req, res, next) => {
    console.log(`${req.method} ${req.url} - Time: ${new Date().toISOString()}`);
    next();
};
app.use(logRequest);

// Ruta de Swagger (por ahora, sin protección)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Rutas de autenticación (públicas)
app.use('/api', authRoutes);

// Middleware de autorización que protege las siguientes rutas
app.use(authMiddleware);

// Rutas protegidas
const routes = [
    residentRoutes,
];

routes.forEach(route => app.use('/api', route));

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal.');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Cerrar conexión al salir del proceso
process.on('SIGINT', async () => {
    await db.end();
    console.log('Conexión a la base de datos cerrada.');
    process.exit(0);
});
