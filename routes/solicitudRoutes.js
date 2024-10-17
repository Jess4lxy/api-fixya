import express from 'express';
import { getSolicitudes, createSolicitud, updateSolicitud, deleteSolicitud } from '../controllers/solicitudController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Solicitudes
 *   description: Gestión de solicitudes de servicio
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Solicitud:
 *       type: object
 *       required:
 *         - descripcion
 *         - tipoServicio
 *         - estado
 *         - fechaCreacion
 *         - residenteId
 *         - proveedorId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la solicitud
 *         descripcion:
 *           type: string
 *           description: Descripción del problema o servicio solicitado
 *         tipoServicio:
 *           type: string
 *           description: Tipo de servicio requerido
 *         estado:
 *           type: string
 *           description: Estado de la solicitud (ej. 'realizado', 'en proceso', 'cancelado')
 *         fechaCreacion:
 *           type: string
 *           format: date
 *           description: Fecha en la que se creó la solicitud
 *         fechaFinalizacion:
 *           type: string
 *           format: date
 *           description: Fecha en la que se finalizó la solicitud (puede ser nula)
 *         prioridad:
 *           type: string
 *           description: Prioridad de la solicitud (ej. 'Alta', 'Media', 'Baja')
 *         residenteId:
 *           type: integer
 *           description: ID del residente que solicita el servicio
 *         proveedorId:
 *           type: integer
 *           description: ID del proveedor asignado para el servicio
 *       example:
 *         id: 1
 *         descripcion: "Problema con la tubería del baño y la taza"
 *         tipoServicio: "Plomería"
 *         estado: "realizado"
 *         fechaCreacion: "2024-07-10"
 *         fechaFinalizacion: null
 *         prioridad: "Alta"
 *         residenteId: 1
 *         proveedorId: 2
 */

/**
 * @swagger
 * /api/solicitudes:
 *   get:
 *     summary: Obtiene la lista de todas las solicitudes
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de solicitudes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Solicitud'
 *       401:
 *         description: No autorizado
 */
router.get('/solicitudes', authMiddleware, getSolicitudes);

/**
 * @swagger
 * /api/solicitudes:
 *   post:
 *     summary: Crea una nueva solicitud
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Solicitud'
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitud'
 *       400:
 *         description: Error en la solicitud o datos inválidos
 */
router.post('/solicitudes', authMiddleware, createSolicitud);

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   put:
 *     summary: Actualiza una solicitud existente
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la solicitud a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Solicitud'
 *     responses:
 *       200:
 *         description: Solicitud actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitud'
 *       404:
 *         description: Solicitud no encontrada
 *       400:
 *         description: Datos inválidos
 */
router.put('/solicitudes/:id', authMiddleware, updateSolicitud);

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   delete:
 *     summary: Elimina una solicitud
 *     tags: [Solicitudes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la solicitud a eliminar
 *     responses:
 *       200:
 *         description: Solicitud eliminada exitosamente
 *       404:
 *         description: Solicitud no encontrada
 */
router.delete('/solicitudes/:id', authMiddleware, deleteSolicitud);

export default router;
