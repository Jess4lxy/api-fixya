import express from 'express';
import serviceController from '../controllers/serviceController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Crea un nuevo servicio
 *     description: Agrega un nuevo servicio al sistema
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               costoBase:
 *                 type: number
 *             example:
 *               nombre: "Plomería"
 *               descripcion: "Reparación de tuberías y grifos"
 *               costoBase: 120
 *     responses:
 *       201:
 *         description: Servicio creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/services', authMiddleware, serviceController.post);

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Obtiene todos los servicios
 *     description: Retorna una lista de todos los servicios registrados
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de servicios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   costoBase:
 *                     type: number
 *                 example:
 *                   id: 1
 *                   nombre: "Plomería"
 *                   descripcion: "Reparación de tuberías y grifos"
 *                   costoBase: 120
 *       401:
 *         description: No autorizado
 */
router.get('/services', authMiddleware, serviceController.get);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Actualiza un servicio existente
 *     description: Modifica los datos de un servicio basado en su ID
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               costoBase:
 *                 type: number
 *             example:
 *               nombre: "Plomería"
 *               descripcion: "Reparación de tuberías y grifos"
 *               costoBase: 150
 *     responses:
 *       200:
 *         description: Servicio actualizado exitosamente
 *       404:
 *         description: Servicio no encontrado
 */
router.put('/services/:id', authMiddleware, serviceController.put);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Elimina un servicio
 *     description: Elimina un servicio del sistema usando su ID
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio
 *     responses:
 *       200:
 *         description: Servicio eliminado exitosamente
 *       404:
 *         description: Servicio no encontrado
 */
router.delete('/services/:id', authMiddleware, serviceController.delete);

export default router;
