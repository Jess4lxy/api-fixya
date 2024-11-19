import express from "express";
import apartmentController from "../controllers/apartmentController.js";

const apartmentRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Apartment
 *     description: Movements related to Apartment administration.
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
 *           description: apartment id in the database
 *         apartmentNumber:
 *           type: string
 *           description: apartment numeration or "physical identification"
 *         floor:
 *           type: integer
 *           description: apartment floor in the building
 *         squareMeters:
 *           type: decimal
 *           description: apartment square meters
 *         bathroomsNumber:
 *           type: integer
 *           description: number of bathrooms in the apartment
 *         roomsNumber:
 *           type: integer
 *           description: number of dormrooms in the apartment
 *       required:
 *         - id
 *         - apartmentNumber
 *         - floor
 *         - squareMeters
 *         - bathroomsNumber
 *         - roomsNumber
 */

/**
 * @swagger
 * /api/apartment:
 *   get:
 *     summary: Get all apartments
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
 *         description: Pages number (default 1)
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Apartments per page (default 50)
 *     responses:
 *       200:
 *         description: Apartment List
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
 *                   description: Total apartments in the database
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
 *         description: Error getting apartments
 */
apartmentRoutes.get("/apartments", apartmentController.getAllApartments);

/**
 * @swagger
 * /api/apartments/{id}:
 *   get:
 *     summary: Get an apartment by ID
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Apartment's ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Apartment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartment'
 *       404:
 *         description: Apartment not found
 *       500:
 *         description: Error fetching the apartment
 */
apartmentRoutes.get("/apartments/:id", apartmentController.getApartmentById);

/**
 * @swagger
 * /api/apartments/create:
 *   post:
 *     summary: Create a new apartment into the database
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apartmentNumber:
 *                 type: string
 *                 description: apartment numeration or "physical identification"
 *               floor:
 *                 type: integer
 *                 description: apartment floor in the building
 *               squareMeters:
 *                 type: decimal
 *                 description: apartment square meters
 *               bathroomsNumber:
 *                 type: integer
 *                 description: number of bathrooms in the apartment
 *               roomsNumber:
 *                 type: integer
 *                 description: number of dormrooms in the apartment
 *       required:
 *         - apartmentNumber
 *         - floor
 *         - squareMeters
 *         - bathroomsNumber
 *         - roomsNumber
 *     responses:
 *       201:
 *         description: Apartment successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartment'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Error creating the apartment
 */
apartmentRoutes.post("/apartments/create", validateApartment, apartmentController.createApartment);

/**
 * @swagger
 * /api/apartments/update/{id}:
 *   put:
 *     summary: Update an apartment
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the apartment to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apartmentNumber:
 *                 type: string
 *                 description: apartment numeration or "physical identification"
 *               floor:
 *                 type: integer
 *                 description: apartment floor in the building
 *               squareMeters:
 *                 type: decimal
 *                 description: apartment square meters
 *               bathroomsNumber:
 *                 type: integer
 *                 description: number of bathrooms in the apartment
 *               roomsNumber:
 *                 type: integer
 *                 description: number of dormrooms in the apartment
 *       required:
 *         - apartmentNumber
 *         - floor
 *         - squareMeters
 *         - bathroomsNumber
 *         - roomsNumber
 *     responses:
 *       200:
 *         description: Apartment successfully updated
 *       404:
 *         description: Apartment not found
 *       500:
 *         description: Error updating the apartment
 */
apartmentRoutes.put("/apartments/update/:id", validateUpdatingApartment, apartmentController.updateApartment);

/**
 * @swagger
 * /api/apartments/delete/{id}:
 *   delete:
 *     summary: Delete an apartment
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the apartment to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Apartment successfully deleted
 *       404:
 *         description: Apartment not found
 *       500:
 *         description: Error deleting the apartment
 */
apartmentRoutes.delete("/apartments/delete/:id", apartmentController.deleteApartment);

export default apartmentRoutes;
