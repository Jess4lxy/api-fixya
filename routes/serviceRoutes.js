import express from 'express';
import serviceController from '../controllers/serviceController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Definir las rutas
router.post('/services', authMiddleware, serviceController.post);
router.get('/services', authMiddleware, serviceController.get);
router.put('/services/:id', authMiddleware, serviceController.put);
router.delete('/services/:id', authMiddleware, serviceController.delete);

// Exportar las rutas
export default router;
