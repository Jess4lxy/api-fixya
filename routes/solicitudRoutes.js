import express from 'express';
import { getSolicitudes, createSolicitud, updateSolicitud, deleteSolicitud } from '../controllers/solicitudController.js';

const router = express.Router();

router.get('/solicitudes', getSolicitudes);
router.post('/solicitudes', createSolicitud);
router.put('/solicitudes/:id', updateSolicitud);
router.delete('/solicitudes/:id', deleteSolicitud);

export default router;
