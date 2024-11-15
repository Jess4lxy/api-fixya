import express from 'express';
import { registerResident, loginResident } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo residente
 *     description: Registra un nuevo residente proporcionando la información necesaria.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - residentId
 *               - username
 *               - email
 *               - password
 *             properties:
 *               residentId:
 *                 type: string
 *                 description: ID único del residente
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del residente
 *               email:
 *                 type: string
 *                 description: Correo electrónico del residente
 *               password:
 *                 type: string
 *                 description: Contraseña del residente
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error al registrar el usuario
 */
router.post('/register', registerResident);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión como residente
 *     description: Inicia sesión con el correo electrónico y la contraseña para obtener un token JWT.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del residente
 *               password:
 *                 type: string
 *                 description: Contraseña del residente
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inicio de sesión exitoso"
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *                 resident:
 *                   type: object
 *                   description: Datos del residente autenticado
 *       400:
 *         description: Error al iniciar sesión
 */
router.post('/login', loginResident);

export default router;
