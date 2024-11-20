import express from "express";
import apartmentController from "../controllers/apartmentController.js";
import { validateApartment, validateUpdatingApartment } from "../middleware/validationMiddleware.js";

const apartmentRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Apartment
 *     description: Operations related to apartment management.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Apartment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the apartment in the database.
 *           example: 1
 *         apartmentNumber:
 *           type: string
 *           description: Apartment's number or physical identification.
 *           example: "A-101"
 *         floor:
 *           type: integer
 *           description: Apartment's floor in the building.
 *           example: 2
 *         squareMeters:
 *           type: number
 *           description: Apartment's size in square meters.
 *           example: 75.5
 *         bathroomsNumber:
 *           type: integer
 *           description: Number of bathrooms in the apartment.
 *           example: 2
 *         roomsNumber:
 *           type: integer
 *           description: Number of rooms in the apartment.
 *           example: 3
 *       required:
 *         - apartmentNumber
 *         - floor
 *         - squareMeters
 *         - bathroomsNumber
 *         - roomsNumber
 */

/**
 * @swagger
 * /api/apartments:
 *   get:
 *     summary: Retrieve all apartments
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number (default is 1).
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of apartments per page (default is 50).
 *     responses:
 *       200:
 *         description: List of apartments retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apartments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Apartment'
 *                 totalApartments:
 *                   type: integer
 *                   description: Total number of apartments.
 *                   example: 150
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available.
 *                   example: 3
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number.
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   description: Number of apartments per page.
 *                   example: 50
 *       500:
 *         description: Internal server error.
 */
apartmentRoutes.get("/apartments", apartmentController.getAllApartments);

/**
 * @swagger
 * /api/apartments/{id}:
 *   get:
 *     summary: Retrieve a specific apartment by ID
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the apartment to retrieve.
 *           example: 1
 *     responses:
 *       200:
 *         description: Apartment retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartment'
 *       404:
 *         description: Apartment not found.
 *       500:
 *         description: Internal server error.
 */
apartmentRoutes.get("/apartments/:id", apartmentController.getApartmentById);

/**
 * @swagger
 * /api/apartments:
 *   post:
 *     summary: Add a new apartment
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Apartment'
 *     responses:
 *       201:
 *         description: Apartment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartment'
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
apartmentRoutes.post("/apartments", validateApartment, apartmentController.createApartment);

/**
 * @swagger
 * /api/apartments/{id}:
 *   put:
 *     summary: Update an existing apartment
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the apartment to update.
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Apartment'
 *     responses:
 *       200:
 *         description: Apartment updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartment'
 *       404:
 *         description: Apartment not found.
 *       500:
 *         description: Internal server error.
 */
apartmentRoutes.put("/apartments/:id", validateUpdatingApartment, apartmentController.updateApartment);

/**
 * @swagger
 * /api/apartments/{id}:
 *   delete:
 *     summary: Delete an apartment
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the apartment to delete.
 *           example: 1
 *     responses:
 *       200:
 *         description: Apartment deleted successfully.
 *       404:
 *         description: Apartment not found.
 *       500:
 *         description: Internal server error.
 */
apartmentRoutes.delete("/apartments/:id", apartmentController.deleteApartment);

export default apartmentRoutes;
