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
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               numeroContacto:
 *                 type: string
 *               numeroDepartamento:
 *                 type: string
 *               historialSolicitudes:
 *                 type: array
 *                 items:
 *                   type: object
 *             example:
 *               nombre: "Renato Augusto Ávila"
 *               email: "sosateresa@reyna.com"
 *               numeroContacto: "555-236-5225"
 *               numeroDepartamento: "283"
 *               historialSolicitudes: []
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
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   email:
 *                     type: string
 *                   numeroContacto:
 *                     type: string
 *                   numeroDepartamento:
 *                     type: string
 *                   historialSolicitudes:
 *                     type: array
 *                     items:
 *                       type: object
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
 *           type: integer
 *         required: true
 *         description: ID del residente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               numeroContacto:
 *                 type: string
 *               numeroDepartamento:
 *                 type: string
 *               historialSolicitudes:
 *                 type: array
 *                 items:
 *                   type: object
 *             example:
 *               nombre: "Renato Augusto Ávila"
 *               email: "renato.avila@correo.com"
 *               numeroContacto: "555-8888-555"
 *               numeroDepartamento: "123"
 *               historialSolicitudes: []
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
 *           type: integer
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
