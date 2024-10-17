import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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

// CORS middleware
app.use(cors({origin: 'https://api-fixya.onrender.com'}));

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
// Rutas de residentes
app.use('/api', residentRoutes);
// Rutas de servicios
app.use('/api', serviceRoutes);
// Rutas de solicitudes
app.use('/api', solicitudRoutes);
// Rutas de proveedor
app.use('/api', proveedorRoutes);
// Rutas de historial de servicios
app.use('/api', historyserviceRoutes);
// Rutas de facturas
app.use('/api', invoiceRoutes);
// Rutas de pagos
app.use('/api', paymentRoutes);
// Rutas de notificaciones
app.use('/api', notificationRoutes);
// Rutas de administrativos
app.use('/api', administrativeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
