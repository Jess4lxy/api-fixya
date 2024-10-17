import express from 'express';
import { createResident, getResidents, updateResident, deleteResident, getResidentFromDepNumb } from '../controllers/residentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Residentes
 *   description: apartado para gestionar residentes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Residente:
 *       type: object
 *       required:
 *         - nombre
 *         - email
 *         - numeroContacto
 *         - numeroDepartamento
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del residente
 *         nombre:
 *           type: string
 *           description: Nombre completo del residente
 *         email:
 *           type: string
 *           description: Correo electrónico del residente
 *         numeroContacto:
 *           type: string
 *           description: Número de contacto del residente
 *         numeroDepartamento:
 *           type: string
 *           description: Número de departamento del residente
 *         historialSolicitudes:
 *           type: array
 *           items:
 *             type: object
 *           description: Historial de solicitudes de servicio realizadas por el residente
 *       example:
 *         id: 1
 *         nombre: "Renato Augusto Ávila"
 *         email: "renato.avila@correo.com"
 *         numeroContacto: "555-236-5225"
 *         numeroDepartamento: "283"
 *         historialSolicitudes: []
 */

/**
 * @swagger
 * /api/residents:
 *   post:
 *     summary: Crea un nuevo residente
 *     description: Agrega un nuevo residente al sistema
 *     tags: [Residentes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Residente'
 *     responses:
 *       201:
 *         description: Residente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Residente'
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
 *     tags: [Residentes]
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
 *                 $ref: '#/components/schemas/Residente'
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
 *     tags: [Residentes]
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
 *             $ref: '#/components/schemas/Residente'
 *     responses:
 *       200:
 *         description: Residente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Residente'
 *       404:
 *         description: Residente no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put('/residents/:id', authMiddleware, updateResident);

/**
 * @swagger
 * /api/residents/{id}:
 *   delete:
 *     summary: Elimina un residente
 *     description: Elimina un residente del sistema usando su ID
 *     tags: [Residentes]
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
 *     tags: [Residentes]
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Residente'
 *       404:
 *         description: Residente no encontrado
 */
router.get('/residents/department/:departmentNumber', authMiddleware, getResidentFromDepNumb);

export default router;
