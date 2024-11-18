import express from "express";
import residentController from "../controllers/residentController.js";
import { validateResident, validateApartmentId } from "../middleware/validationMiddleware.js";

const residentRoutes = express.Router();

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
residentRoutes.get("/residents", residentController.getAllResidents);

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
residentRoutes.get("/residents/:id", residentController.getResidentById);

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
residentRoutes.post("/residents", validateResident, residentController.createResident);

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
 *             type: object
 *             properties:
 *               idApartment:
 *                 type: integer
 *                 description: The ID of the apartment
 *               numRegister:
 *                 type: string
 *                 description: The registration number
 *               identification:
 *                 type: string
 *                 description: The identification number
 *               name:
 *                 type: string
 *                 description: The name of the resident
 *             required:
 *               - idApartment
 *               - numRegister
 *               - identification
 *               - name
 *     responses:
 *       200:
 *         description: Resident successfully updated
 *       404:
 *         description: Resident not found
 *       500:
 *         description: Error updating the resident
 */
residentRoutes.put("/residents/:id", validateResident, residentController.updateResident);

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
residentRoutes.delete("/residents/:id", residentController.deleteResident);

/**
 * @swagger
 * /api/residents/apartment/{idApartment}:
 *   get:
 *     summary: Get residents by Apartment ID
 *     tags: [Resident]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idApartment
 *         in: path
 *         required: true
 *         description: resident's apartment id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of residents in the apartment
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
residentRoutes.get("/residents/apartment/:idApartment", validateApartmentId, residentController.getResidentsByApartment);

export default residentRoutes;
