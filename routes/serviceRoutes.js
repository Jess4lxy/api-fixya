import express from 'express';
import serviceController from '../controllers/serviceController.js';
import { validateService, validateUpdatingService } from '../middleware/validationMiddleware.js';

const serviceRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Service
 *     description: Operations related to service management.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the service in the database.
 *           example: 1
 *         category:
 *           type: string
 *           description: Category of the service (e.g., plumbing, cleaning).
 *           example: "Cleaning"
 *         serviceType:
 *           type: string
 *           description: Specific type of service provided.
 *           example: "Deep cleaning"
 *         description:
 *           type: string
 *           description: Detailed description of the service.
 *           example: "Comprehensive cleaning for homes and offices."
 *         basePrice:
 *           type: number
 *           format: float
 *           description: Base price of the service.
 *           example: 150.50
 *         quantityAdjustment:
 *           type: boolean
 *           description: Indicates if the price can be adjusted based on quantity.
 *           example: true
 *       required:
 *         - serviceType
 *         - basePrice
 *         - quantityAdjustment
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Retrieve all services
 *     tags: [Service]
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
 *         description: Number of services per page (default is 50).
 *     responses:
 *       200:
 *         description: List of services retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 *                 totalServices:
 *                   type: integer
 *                   description: Total number of services.
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available.
 *                   example: 2
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number.
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   description: Number of services per page.
 *                   example: 50
 *       500:
 *         description: Internal server error.
 */
serviceRoutes.get("/services", serviceController.getAllServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Retrieve a specific service by ID
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the service to retrieve.
 *           example: 1
 *     responses:
 *       200:
 *         description: Service retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found.
 *       500:
 *         description: Internal server error.
 */
serviceRoutes.get("/services/:id", serviceController.getServiceById);

/**
 * @swagger
 * /api/services/create:
 *   post:
 *     summary: Add a new service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category of the service
 *               serviceType:
 *                 type: string
 *                 description: The type of the service
 *               description:
 *                 type: string
 *                 description: A detailed description of the service
 *               basePrice:
 *                 type: number
 *                 format: float
 *                 description: The base price of the service
 *               quantityAdjustment:
 *                 type: boolean
 *                 description: Whether the service allows quantity adjustments
 *             required:
 *               - category
 *               - serviceType
 *               - description
 *               - basePrice
 *               - quantityAdjustment
 *     responses:
 *       201:
 *         description: Service created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
serviceRoutes.post("/services/create", validateService, serviceController.createService);

/**
 * @swagger
 * /api/services/update/{id}:
 *   put:
 *     summary: Update an existing service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the service to update.
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found.
 *       500:
 *         description: Internal server error.
 */
serviceRoutes.put("/services/update/:id", validateUpdatingService, serviceController.updateService);

/**
 * @swagger
 * /api/services/delete/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the service to delete.
 *           example: 1
 *     responses:
 *       200:
 *         description: Service deleted successfully.
 *       404:
 *         description: Service not found.
 *       500:
 *         description: Internal server error.
 */
serviceRoutes.delete("/services/delete/:id", serviceController.deleteService);

export default serviceRoutes;
