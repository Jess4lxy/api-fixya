import express from 'express';
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

app.use(express.json());

// Rutas de residentes
app.use('/api', residentRoutes);
// Rutas de servicios
app.use('/api', serviceRoutes);
//Rutas de solicitudes
app.use ('/api', solicitudRoutes);
//Rutas de proveedor
app.use ('/api', proveedorRoutes);
//Rutas de historial de servicios
app.use ('/api', historyserviceRoutes);

// Rutas de facturas
app.use('/api', invoiceRoutes);

// Rutas de pagos
app.use('/api', paymentRoutes);

// Rutas de notificaciones
app.use('/api', notificationRoutes); 

// Rutas de administrativos
app.use('/api', administrativeRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
