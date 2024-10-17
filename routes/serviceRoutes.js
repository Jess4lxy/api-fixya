import express from 'express';
import serviceController from '../controllers/serviceController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Servicios
 *   description: Gestión de los servicios ofrecidos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Servicio:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *         - costoBase
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del servicio
 *         nombre:
 *           type: string
 *           description: Nombre del servicio
 *         descripcion:
 *           type: string
 *           description: Breve descripción del servicio
 *         costoBase:
 *           type: number
 *           format: float
 *           description: Costo base del servicio en MXN
 *       example:
 *         id: 1
 *         nombre: "Plomería"
 *         descripcion: "Reparación de tuberías y grifos"
 *         costoBase: 120
 */

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Crea un nuevo servicio
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servicio'
 *     responses:
 *       201:
 *         description: Servicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       400:
 *         description: Error en la solicitud o datos inválidos
 */
router.post('/services', authMiddleware, serviceController.post);

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Obtiene la lista de todos los servicios
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
 *                 $ref: '#/components/schemas/Servicio'
 *       401:
 *         description: No autorizado
 */
router.get('/services', authMiddleware, serviceController.get);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Actualiza un servicio existente
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servicio'
 *     responses:
 *       200:
 *         description: Servicio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       404:
 *         description: Servicio no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put('/services/:id', authMiddleware, serviceController.put);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Elimina un servicio
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio a eliminar
 *     responses:
 *       200:
 *         description: Servicio eliminado exitosamente
 *       404:
 *         description: Servicio no encontrado
 */
router.delete('/services/:id', authMiddleware, serviceController.delete);

export default router;
