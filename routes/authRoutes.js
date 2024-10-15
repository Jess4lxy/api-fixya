import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

// inicio de sesion
router.post('/login', login);

// registro
router.post('/register', register);

router.get('/protected-route', authMiddleware, (req, res) => {
    res.json({ message: 'Acceso permitido', user: req.user });
});

export default router;