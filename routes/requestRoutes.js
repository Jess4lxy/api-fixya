import express from 'express';
import requestController from '../controllers/requestController.js';
import { validateRequest, validateUpdatingRequest } from '../middleware/validationMiddleware.js';

const requestRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Request
 *     description: Operations related to request management.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Request:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the request.
 *           example: 1
 *         residentUserId:
 *           type: integer
 *           description: ID of the resident user who made the request.
 *           example: 101
 *         serviceId:
 *           type: integer
 *           description: ID of the service being requested.
 *           example: 5
 *         quantity:
 *           type: integer
 *           description: Quantity of the service requested.
 *           example: 2
 *         totalPrice:
 *           type: number
 *           format: float
 *           description: Total price of the request.
 *           example: 500.75
 *         requestDate:
 *           type: string
 *           format: date-time
 *           description: Date and time when the request was made.
 *           example: "2024-11-21"
 *         scheduledDate:
 *           type: string
 *           format: date-time
 *           description: Scheduled date and time for the service.
 *           example: "2024-11-25"
 *         status:
 *           type: string
 *           description: Current status of the request.
 *           example: "Pendiente"
 *       required:
 *         - residentUserId
 *         - serviceId
 *         - quantity
 *         - totalPrice
 *         - scheduledDate
 *         - status
 */

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Retrieve all requests
 *     tags: [Request]
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
 *         description: Number of requests per page (default is 50).
 *     responses:
 *       200:
 *         description: List of requests retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 requests:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Request'
 *                 totalRequests:
 *                   type: integer
 *                   description: Total number of requests.
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
 *                   description: Number of requests per page.
 *                   example: 50
 *       500:
 *         description: Internal server error.
 */
requestRoutes.get("/requests", requestController.getAllRequests);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Retrieve a specific request by ID
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the request to retrieve.
 *           example: 1
 *     responses:
 *       200:
 *         description: Request retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       404:
 *         description: Request not found.
 *       500:
 *         description: Internal server error.
 */
requestRoutes.get("/requests/:id", requestController.getRequestById);

/**
 * @swagger
 * /api/requests/create:
 *   post:
 *     summary: Add a new request
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               residentUserId:
 *                 type: integer
 *                 description: ID of the resident user making the request.
 *               serviceId:
 *                 type: integer
 *                 description: ID of the service being requested.
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the service requested.
 *               totalPrice:
 *                 type: number
 *                 format: float
 *                 description: Total price of the request.
 *               scheduledDate:
 *                 type: string
 *                 format: date-time
 *                 description: Scheduled date and time for the service.
 *               status:
 *                 type: string
 *                 description: Status of the request (e.g., Pendiente, Aceptada).
 *             required:
 *               - residentUserId
 *               - serviceId
 *               - quantity
 *               - totalPrice
 *               - scheduledDate
 *               - status
 *     responses:
 *       201:
 *         description: Request created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
requestRoutes.post("/requests/create", validateRequest, requestController.createRequest);

/**
 * @swagger
 * /api/requests/update/{id}:
 *   put:
 *     summary: Update an existing request
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the request to update.
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               residentUserId:
 *                 type: integer
 *                 description: ID of the resident user making the request.
 *               serviceId:
 *                 type: integer
 *                 description: ID of the service being requested.
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the service requested.
 *               totalPrice:
 *                 type: number
 *                 format: float
 *                 description: Total price of the request.
 *               scheduledDate:
 *                 type: string
 *                 format: date-time
 *                 description: Scheduled date and time for the service.
 *               status:
 *                 type: string
 *                 description: Status of the request (e.g., Pendiente, Aceptada).
 *             required:
 *               - residentUserId
 *               - serviceId
 *               - quantity
 *               - totalPrice
 *               - scheduledDate
 *               - status
 *     responses:
 *       200:
 *         description: Request updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       404:
 *         description: Request not found.
 *       500:
 *         description: Internal server error.
 */
requestRoutes.put("/requests/update/:id", validateUpdatingRequest, requestController.updateRequest);

/**
 * @swagger
 * /api/requests/delete/{id}:
 *   delete:
 *     summary: Delete a request
 *     tags: [Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the request to delete.
 *           example: 1
 *     responses:
 *       200:
 *         description: Request deleted successfully.
 *       404:
 *         description: Request not found.
 *       500:
 *         description: Internal server error.
 */
requestRoutes.delete("/requests/delete/:id", requestController.deleteRequest);

export default requestRoutes;
