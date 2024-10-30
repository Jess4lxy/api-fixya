import express from 'express';
import { login, register } from '../controllers/authorizationController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operaciones de autenticación
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: testuser
 *               password:
 *                 type: string
 *                 description: Contraseña
 *                 example: password123
 *     responses:
 *       200:
 *         description: Token de acceso generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de acceso
 *       401:
 *         description: Credenciales inválidas
 */

// Inicio de sesión
router.post('/login', login);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: testuser
 *               password:
 *                 type: string
 *                 description: Contraseña
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: El usuario ya existe
 */

// Registro
router.post('/register', register);

// En caso de que necesitemos proteger una ruta en específico ya por separado (lo dudo), utiliza esto:
// router.get('/protected-route', authMiddleware, (req, res) => {
//     res.json({ message: 'Acceso permitido', user: req.user });
// });

export default router;
