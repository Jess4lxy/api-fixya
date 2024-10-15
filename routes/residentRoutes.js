import express from 'express';
import { createResident, getResidents, updateResident, deleteResident, getResidentFromDepNumb } from '../controllers/residentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/residents:
 *   post:
 *     summary: Crea un nuevo residente
 *     description: Agrega un nuevo residente al sistema
 *     tags: [Residents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               departmentNumber:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:
 *               name: "John Doe"
 *               departmentNumber: "101"
 *               phone: "555-1234"
 *     responses:
 *       201:
 *         description: Residente creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/residents', authMiddleware, createResident);

/**
 * @swagger
 * /api/residents:
 *   get:
 *     summary: Obtiene todos los residentes
 *     description: Retorna una lista de todos los residentes registrados
 *     tags: [Residents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de residentes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   departmentNumber:
 *                     type: string
 *                   phone:
 *                     type: string
 *       401:
 *         description: No autorizado
 */
router.get('/residents', authMiddleware, getResidents);

/**
 * @swagger
 * /api/residents/{id}:
 *   put:
 *     summary: Actualiza un residente existente
 *     description: Modifica los datos de un residente basado en su ID
 *     tags: [Residents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del residente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               departmentNumber:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:
 *               name: "Jane Doe"
 *               departmentNumber: "102"
 *               phone: "555-5678"
 *     responses:
 *       200:
 *         description: Residente actualizado exitosamente
 *       404:
 *         description: Residente no encontrado
 */
router.put('/residents/:id', authMiddleware, updateResident);

/**
 * @swagger
 * /api/residents/{id}:
 *   delete:
 *     summary: Elimina un residente
 *     description: Elimina un residente del sistema usando su ID
 *     tags: [Residents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del residente
 *     responses:
 *       200:
 *         description: Residente eliminado exitosamente
 *       404:
 *         description: Residente no encontrado
 */
router.delete('/residents/:id', authMiddleware, deleteResident);

/**
 * @swagger
 * /api/residents/department/{departmentNumber}:
 *   get:
 *     summary: Obtiene un residente por su número de departamento
 *     description: Busca y devuelve un residente según su número de departamento
 *     tags: [Residents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: departmentNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de departamento del residente
 *     responses:
 *       200:
 *         description: Residente encontrado
 *       404:
 *         description: Residente no encontrado
 */
router.get('/residents/department/:departmentNumber', authMiddleware, getResidentFromDepNumb);

export default router;
