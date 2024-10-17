import express from 'express';
import historyServiceController from '../controllers/historyserviceController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Historial de Servicios
 *   description: Gestión del historial de servicios realizados
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     HistorialServicio:
 *       type: object
 *       required:
 *         - proveedorId
 *         - solicitudId
 *         - fechaFinalizacion
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del historial del servicio
 *         proveedorId:
 *           type: integer
 *           description: ID del proveedor que realizó el servicio
 *         solicitudId:
 *           type: integer
 *           description: ID de la solicitud asociada al servicio
 *         fechaFinalizacion:
 *           type: string
 *           format: date
 *           description: Fecha en la que se finalizó el servicio
 *         comentarios:
 *           type: string
 *           description: Comentarios adicionales sobre el servicio
 *       example:
 *         id: 1
 *         proveedorId: 1
 *         solicitudId: 1
 *         fechaFinalizacion: "2024-09-19"
 *         comentarios: "Servicio completado con éxito."
 */

/**
 * @swagger
 * /api/historialServicios:
 *   post:
 *     summary: Crea un nuevo registro de historial de servicio
 *     tags: [Historial de Servicios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistorialServicio'
 *     responses:
 *       201:
 *         description: Registro de historial de servicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistorialServicio'
 *       400:
 *         description: Error en la solicitud o datos inválidos
 */
router.post('/historialServicios', authMiddleware, historyServiceController.postService);

/**
 * @swagger
 * /api/historialServicios:
 *   get:
 *     summary: Obtiene la lista de todos los registros de historial de servicios
 *     tags: [Historial de Servicios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de registros de historial de servicios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HistorialServicio'
 *       401:
 *         description: No autorizado
 */
router.get('/historialServicios', authMiddleware, historyServiceController.getServices);

/**
 * @swagger
 * /api/historialServicios/{id}:
 *   put:
 *     summary: Actualiza un registro de historial de servicio existente
 *     tags: [Historial de Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del historial de servicio a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistorialServicio'
 *     responses:
 *       200:
 *         description: Registro de historial de servicio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistorialServicio'
 *       404:
 *         description: Registro de historial de servicio no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put('/historialServicios/:id', authMiddleware, historyServiceController.updateService);

/**
 * @swagger
 * /api/historialServicios/{id}:
 *   delete:
 *     summary: Elimina un registro de historial de servicio
 *     tags: [Historial de Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del historial de servicio a eliminar
 *     responses:
 *       200:
 *         description: Registro de historial de servicio eliminado exitosamente
 *       404:
 *         description: Registro de historial de servicio no encontrado
 */
router.delete('/historialServicios/:id', authMiddleware, historyServiceController.deleteService);

export default router;
