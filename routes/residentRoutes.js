import express from "express";
import { check, validationResult } from "express-validator";
import residentService from "../services/residentService.js";
import Resident from "../models/resident.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Resident
 *     description: Movements related to residents
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Resident:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: resident id in the database
 *         idApartment:
 *           type: integer
 *           description: resident's apartment id
 *         numRegister:
 *           type: string
 *           description: resident's unique number registration
 *         identification:
 *           type: string
 *           description: resident identification
 *         name:
 *           type: string
 *           description: resident name
 *       required:
 *         - id
 *         - idApartment
 *         - numRegister
 *         - identification
 *         - name
 */

/**
 * @swagger
 * /api/residents:
 *   get:
 *     summary: Get all residents
 *     tags: [Resident]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Pages number (default 1)
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Residents per page (default 50)
 *     responses:
 *       200:
 *         description: Resident List
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
 *                   description: Total residents in the database
 *                 totalPages:
 *                   type: integer
 *                   description: Total pages to show
 *                 currentPage:
 *                   type: integer
 *                   description: Current showed page
 *                 pageSize:
 *                   type: integer
 *                   description: Elements per page
 *       500:
 *         description: Error getting residents
 */
router.get("/residents", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 50;

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
 *     summary: Get a resident by ID
 *     tags: [Resident]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Resident's ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resident found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resident'
 *       404:
 *         description: Resident not found
 *       500:
 *         description: Error fetching the resident
 */
router.get("/residents/:id", async (req, res) => {
    try {
        const resident = await residentService.getResidentById(req.params.id);
        if (!resident) {
            return res.status(404).json({ error: "Resident not found" });
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
 *     summary: Create a new resident
 *     tags: [Resident]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idApartment:
 *                 type: integer
 *                 description: Resident's apartment ID
 *               numRegister:
 *                 type: string
 *                 description: Unique registration number
 *               identification:
 *                 type: string
 *                 description: Resident identification
 *               name:
 *                 type: string
 *                 description: Resident name
 *             required:
 *               - idApartment
 *               - numRegister
 *               - identification
 *               - name
 *     responses:
 *       201:
 *         description: Resident successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resident'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error creating the resident
 */
router.post("/residents", validateResident, async (req, res) => {
    try {
        const { idApartment, numRegister, identification, name } = req.body;
        const newResident = { idApartment, numRegister, identification, name };
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
 *     summary: Update a resident
 *     tags: [Resident]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the resident to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resident'
 *     responses:
 *       200:
 *         description: Resident successfully updated
 *       404:
 *         description: Resident not found
 *       500:
 *         description: Error updating the resident
 */
router.put("/residents/:id", validateResident, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedResident = await residentService.updateResident(id, updatedData);
        if (!updatedResident) {
            return res.status(404).json({ error: "Resident not found" });
        }
        res.json(updatedResident);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/residents/{id}:
 *   delete:
 *     summary: Delete a resident
 *     tags: [Resident]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the resident to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resident successfully deleted
 *       404:
 *         description: Resident not found
 *       500:
 *         description: Error deleting the resident
 */
router.delete("/residents/:id", async (req, res) => {
    try {
        const result = await residentService.deleteResident(req.params.id);
        if (!result) {
            return res.status(404).json({ error: "Resident not found" });
        }
        res.json({ message: "Resident successfully deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/residents/department/{departmentId}:
 *   get:
 *     summary: Get residents by department ID
 *     tags: [Resident]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: departmentId
 *         in: path
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of residents in the department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resident'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Error fetching residents
 */
router.get("/residents/department/:departmentId", async (req, res) => {
    try {
        const residents = await residentService.findResidentsByDepartment(req.params.departmentId);
        if (!residents.length) {
            return res.status(404).json({ error: "No residents found for this department" });
        }
        res.json(residents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
