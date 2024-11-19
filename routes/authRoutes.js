import express from 'express';
import { registerResident, loginResident } from '../controllers/authController.js';
import { validateResidentRegister } from '../middleware/validationMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new resident user
 *     tags: [Authentication]
 *     description: Registers a new resident user by providing the necessary information.
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
 *                 type: integer
 *                 description: Unique ID of the resident
 *               username:
 *                 type: string
 *                 description: Username of the resident
 *               email:
 *                 type: string
 *                 description: Resident's email address
 *               password:
 *                 type: string
 *                 description: Resident's password
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Error registering the user
 *       500:
 *         description: Server error
 */
router.post('/register', registerResident);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login as a resident
 *     tags: [Authentication]
 *     description: Logs in with the email and password to obtain a JWT token.
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
 *                 description: Resident's email address
 *               password:
 *                 type: string
 *                 description: Resident's password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                 resident:
 *                   type: object
 *                   description: Data of the authenticated resident
 *       400:
 *         description: Error logging in
 *       401:
 *         description: Incorrect credentials
 *       500:
 *         description: Server error
 */
router.post('/login', validateResidentRegister, loginResident);

export default router;
