import express from 'express';
import serviceController from '../controllers/serviceController.js';

const router = express.Router();

// Definir las rutas
router.post('/services', serviceController.post);
router.get('/services', serviceController.get);
router.put('/services/:id', serviceController.put);
router.delete('/services/:id', serviceController.delete);

// Exportar las rutas
export default router;
