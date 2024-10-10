import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import residentRoutes from './controllers/residentController.js';
import serviceRoutes from './controllers/serviceController.js'; // Cambiado aquí
import solicitudRoutes from './controllers/solicitudController.js';
import proveedorRoutes from './controllers/proveedorController.js';
import historyserviceRoutes from './controllers/historyserviceController.js';
import administrativeRoutes from './controllers/administrativeController.js'; 
import paymentRoutes from './controllers/paymentController.js';
import invoiceRoutes from './controllers/invoiceController.js';
import notificationRoutes from './controllers/notificationController.js'; 


const app = express();

// Middleware de Morgan para logging de peticiones HTTP
app.use(morgan('dev'));

// Middleware de Body-parser
app.use(bodyParser.urlencoded({ extended: true })); // para datos codificados en url
app.use(bodyParser.json()); // para parsear JSON en el cuerpo de las solicitudes

// Middleware personalizado para loguear solicitudes
const logRequest = (req, res, next) => {
    console.log(`${req.method} ${req.url} - Time: ${new Date().toISOString()}`);
    next();
};
app.use(logRequest);

// middleware nativo
app.use(express.json());

// Rutas de residentes
app.use('/fixya', residentRoutes);
// Rutas de servicios
app.use('/fixya', serviceRoutes);
//Rutas de solicitudes
app.use ('/fixya', solicitudRoutes);
//Rutas de proveedor
app.use ('/fixya', proveedorRoutes);
//Rutas de historial de servicios
app.use ('/fixya', historyserviceRoutes);
// Rutas de facturas
app.use('/fixya', invoiceRoutes);
// Rutas de pagos
app.use('/fixya', paymentRoutes);
// Rutas de notificaciones
app.use('/fixya', notificationRoutes);
// Rutas de administrativos
app.use('/fixya', administrativeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
