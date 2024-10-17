import express from 'express';
import { createProveedor, getProveedores, updateProveedor, deleteProveedor } from '../controllers/proveedorController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Proveedor:
 *       type: object
 *       required:
 *         - nombre
 *         - servicioOfrecido
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del proveedor
 *         nombre:
 *           type: string
 *           description: Nombre del proveedor
 *         servicioOfrecido:
 *           type: string
 *           description: Tipo de servicio que ofrece el proveedor
 *         certificaciones:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de certificaciones del proveedor
 *         calificacion:
 *           type: number
 *           format: float
 *           description: Calificación promedio del proveedor
 *         informacionContacto:
 *           type: object
 *           properties:
 *             telefono:
 *               type: string
 *               description: Número de teléfono de contacto
 *             email:
 *               type: string
 *               description: Correo electrónico del proveedor
 *       example:
 *         id: 1
 *         nombre: "Plomeros de Mérida"
 *         servicioOfrecido: "Plomería"
 *         certificaciones:
 *           - "Plomero Certificado"
 *         calificacion: 4.8
 *         informacionContacto:
 *           telefono: "999-888-7777"
 *           email: "contacto@plomerosmerida.com"
 */

/**
 * @swagger
 * /api/proveedores:
 *   post:
 *     summary: Crea un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 *     responses:
 *       201:
 *         description: Proveedor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedor'
 *       400:
 *         description: Error en la solicitud o datos inválidos
 */
router.post('/proveedores', authMiddleware, createProveedor);

/**
 * @swagger
 * /api/proveedores:
 *   get:
 *     summary: Obtiene la lista de proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Proveedor'
 *       401:
 *         description: No autorizado
 */
router.get('/proveedores', authMiddleware, getProveedores);

/**
 * @swagger
 * /api/proveedores/{id}:
 *   put:
 *     summary: Actualiza un proveedor existente
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proveedor a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 *     responses:
 *       200:
 *         description: Proveedor actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proveedor'
 *       404:
 *         description: Proveedor no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put('/proveedores/:id', authMiddleware, updateProveedor);

/**
 * @swagger
 * /api/proveedores/{id}:
 *   delete:
 *     summary: Elimina un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proveedor a eliminar
 *     responses:
 *       200:
 *         description: Proveedor eliminado exitosamente
 *       404:
 *         description: Proveedor no encontrado
 */
router.delete('/proveedores/:id', authMiddleware, deleteProveedor);

export default router;
