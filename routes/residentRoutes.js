import express from 'express';
import {createResident, getResidents} from '../controllers/residentController.js';

const router = express.Router();

router.post('/residents', createResident);
router.get('/residents', getResidents);

export default router;
