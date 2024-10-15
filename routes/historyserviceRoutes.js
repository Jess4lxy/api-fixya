import express from 'express';
import historyServiceController from '../controllers/historyserviceController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/historialServicios', authMiddleware, historyServiceController.postService);
router.get('/historialServicios', authMiddleware, historyServiceController.getServices);
router.put('/historialServicios/:id', authMiddleware, historyServiceController.updateService);
router.delete('/historialServicios/:id', authMiddleware, historyServiceController.deleteService);

export default router;
