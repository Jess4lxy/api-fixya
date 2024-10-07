import express from 'express';
import historyServiceController from '../controllers/historyserviceController.js';

const router = express.Router();

router.post('/historialServicios', historyServiceController.postService);
router.get('/historialServicios', historyServiceController.getServices);
router.put('/historialServicios/:id', historyServiceController.updateService);
router.delete('/historialServicios/:id', historyServiceController.deleteService);

export default router;
