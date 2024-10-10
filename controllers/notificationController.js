import express from 'express';
import { check, validationResult } from 'express-validator';
import notificationService from '../services/notificationService.js';

const router = express.Router();

// Obtener todas las notificaciones
router.get('/notifications', async (req, res) => {
    try {
        const notifications = await notificationService.getAllNotifications();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una notificación específica por ID con validación
router.get('/notifications/:id', [
    check('id').isNumeric().withMessage('El ID debe ser un número') // Validación del ID
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const notification = await notificationService.getNotificationById(req.params.id);
        if (notification) {
            res.json(notification);
        } else {
            res.status(404).json({ error: 'Notificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;