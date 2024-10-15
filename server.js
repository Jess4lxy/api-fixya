import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
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

const app = express();

// CORS middleware
app.use(cors({origin: 'https://api-fixya.onrender.com'}));

// configuracion JWT
const secretKey = 'D7f!zPq3*Qm9@wX4';
const payload = {
    userId: '512',
};

const token = jwt.sign(payload, secretKey, { expiresIn: '3h' });
console.log("Token de acceso JWT: " + token);

// middleware de Morgan para logging de peticiones HTTP
app.use(morgan('dev'));

// middleware de Body-parser
app.use(bodyParser.urlencoded({ extended: true })); // para datos codificados en url
app.use(bodyParser.json()); // para parsear JSON en el cuerpo de las solicitudes

// middleware personalizado para loguear solicitudes
const logRequest = (req, res, next) => {
    console.log(`${req.method} ${req.url} - Time: ${new Date().toISOString()}`);
    next();
};
app.use(logRequest);

// // middleware de autenticación
// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         return res.status(401).json({ error: 'Se requiere autorización.' });
//     }

//     const token = authHeader.split(' ')[1]; // Obtener el token del encabezado
//     jwt.verify(token, secretKey, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ error: 'Token no válido.' });
//         }
//         req.user = decoded;
//         next();
//     });
// };

// // Aplicar el middleware de autenticación a todas las rutas
// app.use(authMiddleware);

// Middleware nativo
app.use(express.json());

// Rutas de residentes
app.use('/api', residentRoutes, swaggerUI.serve, swaggerUI.setup(swaggerSpec));
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
// Rutas de autenticacion
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
