import express from "express";
import { check, validationResult } from "express-validator";
import residentService from "../services/residentService.js";
import Resident from "../models/resident.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Residente
 *     description: Operaciones relacionadas con los residentes.
 */

/**
 * @swagger
 * /api/residents:
 *   get:
 *     summary: Obtener todos los residentes con paginación
 *     tags: [Residente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página para la paginación (por defecto 1)
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Cantidad de residentes por página (por defecto 50)
 *     responses:
 *       200:
 *         description: Lista de residentes con metadatos de paginación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 residents:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Resident'
 *                 totalResidents:
 *                   type: integer
 *                   description: Total de residentes en la base de datos
 *                 totalPages:
 *                   type: integer
 *                   description: Número total de páginas
 *                 currentPage:
 *                   type: integer
 *                   description: Página actual
 *                 pageSize:
 *                   type: integer
 *                   description: Cantidad de elementos por página
 *       500:
 *         description: Error al obtener los residentes
 */
router.get("/residents", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 100;

    try {
        // Obtener los residentes con paginación
        const residents = await residentService.getAllResidents(page, pageSize);

        // Obtener el total de residentes
        const totalResidents = await residentService.getTotalResidents();

        // Calcular la cantidad total de páginas
        const totalPages = Math.ceil(totalResidents / pageSize);

        // Responder con los residentes y metadatos de la paginación
        res.json({
            residents,
            totalResidents,
            totalPages,
            currentPage: page,
            pageSize: pageSize
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


/**
 * @swagger
 * /api/residents/{id}:
 *   get:
 *     summary: Obtener un residente por su ID
 *     tags: [Residente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del residente
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Residente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resident'
 *       404:
 *         description: Residente no encontrado
 *       500:
 *         description: Error al obtener el residente
 */
router.get("/residents/:id", async (req, res) => {
    try {
        const resident = await residentService.getResidentById(req.params.id);
        if (!resident) {
            return res.status(404).json({ error: "Residente no encontrado" });
        }
        res.json(resident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/residents:
 *   post:
 *     summary: Crear un nuevo residente
 *     tags: [Residente]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResidentInput'
 *     responses:
 *       201:
 *         description: Residente creado exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 *       500:
 *         description: Error al crear el residente
 */
router.post("/residents", validateResident, async (req, res) => {
    try {
        const { idDepartamento, numRegistro, identificacion, nombre } = req.body;
        const newResident = new Resident(null, idDepartamento, numRegistro, identificacion, nombre);
        const addedResident = await residentService.createResident(newResident);
        res.status(201).json(addedResident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/residents/{id}:
 *   put:
 *     summary: Actualizar un residente
 *     tags: [Residente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del residente a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResidentInput'
 *     responses:
 *       200:
 *         description: Residente actualizado exitosamente
 *       404:
 *         description: Residente no encontrado
 *       500:
 *         description: Error al actualizar el residente
 */
router.put("/residents/:id", validateResident, async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedResident = await residentService.updateResident(id, updatedData);
        res.json(updatedResident);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/residents/{id}:
 *   delete:
 *     summary: Eliminar un residente
 *     tags: [Residente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del residente a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Residente eliminado exitosamente
 *       404:
 *         description: Residente no encontrado
 *       500:
 *         description: Error al eliminar el residente
 */
router.delete("/residents/:id", async (req, res) => {
    try {
        const result = await residentService.deleteResident(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Obtener residentes por ID de departamento con validación
/**
 * @swagger
 * /api/residents/department/{departmentId}:
 *   get:
 *     summary: Obtener residentes por ID de departamento
 *     tags: [Residente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: departmentId
 *         in: path
 *         required: true
 *         description: ID del departamento
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de residentes del departamento
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error al obtener los residentes
 */
router.get("/residents/department/:departmentId", [
    check("departmentId").isInt().withMessage("El ID de departamento debe ser un número entero"),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const residents = await residentService.findResidentsByDepartment(req.params.departmentId);
        res.json(residents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
