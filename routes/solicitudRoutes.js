import express from 'express';
import { getSolicitudes, createSolicitud, updateSolicitud, deleteSolicitud } from '../controllers/solicitudController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/solicitudes', authMiddleware, getSolicitudes);
router.post('/solicitudes', authMiddleware, createSolicitud);
router.put('/solicitudes/:id', authMiddleware, updateSolicitud);
router.delete('/solicitudes/:id', authMiddleware, deleteSolicitud);

export default router;
