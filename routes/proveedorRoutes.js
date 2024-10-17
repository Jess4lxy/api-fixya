import express from 'express';
import { createProveedor, getProveedores, updateProveedor, deleteProveedor } from '../controllers/proveedorController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del proveedor
 *               serviceType:
 *                 type: string
 *                 description: Tipo de servicio del proveedor
 *             required:
 *               - name
 *               - serviceType
 *     responses:
 *       201:
 *         description: Proveedor creado exitosamente
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del proveedor
 *                   name:
 *                     type: string
 *                     description: Nombre del proveedor
 *                   serviceType:
 *                     type: string
 *                     description: Tipo de servicio que ofrece el proveedor
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
 *           type: string
 *         required: true
 *         description: ID del proveedor a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre actualizado del proveedor
 *               serviceType:
 *                 type: string
 *                 description: Tipo de servicio actualizado del proveedor
 *     responses:
 *       200:
 *         description: Proveedor actualizado exitosamente
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
 *           type: string
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
