import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js';
import residentRoutes from './controllers/residentController.js';
import serviceRoutes from './controllers/serviceController.js';
import solicitudRoutes from './controllers/solicitudController.js';
import proveedorRoutes from './controllers/proveedorController.js';
import historyserviceRoutes from './controllers/historyserviceController.js';
import administrativeRoutes from './controllers/administrativeController.js';
import paymentRoutes from './controllers/paymentController.js';
import invoiceRoutes from './controllers/invoiceController.js';
import notificationRoutes from './controllers/notificationController.js';
import authRoutes from './routes/authRoutes.js';
import { authMiddleware } from './middleware/authMiddleware.js';

const app = express();

dotenv.config();

const initializeDBConnection = async () => {
    try {
        const connection = await mysql.createConnection(process.env.MYSQL_URI);
        console.log('Conexión a la base de datos establecida');
        return connection;
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); // Salir si no se puede conectar
    }
};

const connection = await initializeDBConnection();


// CORS middleware
app.use(cors({origin: ['https://api-fixya.onrender.com', 'http://localhost:3000']}));

// middleware de Morgan para logging de peticiones HTTP
app.use(morgan('dev'));

// middleware de Body-parser
app.use(bodyParser.urlencoded({ extended: true })); // para datos codificados en url
app.use(bodyParser.json()); // para parsear JSON en el cuerpo de las solicitudes
app.use(express.json()); // middleware nativo

// middleware personalizado para loguear solicitudes
const logRequest = (req, res, next) => {
    console.log(`${req.method} ${req.url} - Time: ${new Date().toISOString()}`);
    next();
};
app.use(logRequest);

// ruta de swagger (por ahora, sin proteccion)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// rutas de autenticacion (publicas)
app.use('/api', authRoutes);

// Middleware de autorizacion que protege las siguientes rutas
app.use(authMiddleware)

// Rutas
const routes = [
    residentRoutes,
    serviceRoutes,
    solicitudRoutes,
    proveedorRoutes,
    historyserviceRoutes,
    invoiceRoutes,
    paymentRoutes,
    notificationRoutes,
    administrativeRoutes,
];

routes.forEach(route => app.use('/api', route));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal.');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

process.on('SIGINT', async () => {
    await connection.end();
    console.log('Conexión a la base de datos cerrada.');
    process.exit(0);
});