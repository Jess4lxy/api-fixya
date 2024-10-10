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
