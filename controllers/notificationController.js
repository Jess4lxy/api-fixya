import express from 'express';
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

// Obtener una notificación específica por ID
router.get('/notifications/:id', async (req, res) => {
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
