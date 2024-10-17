import express from 'express';
import { login, register } from '../controllers/authorizationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// inicio de sesion
router.post('/login', login);

// registro
router.post('/register', register);

// en caso de que necesitemos proteger una ruta en especifico ya por separado (lo dudo), utiliza esto:
// router.get('/protected-route', authMiddleware, (req, res) => {
//     res.json({ message: 'Acceso permitido', user: req.user });
// });

export default router;