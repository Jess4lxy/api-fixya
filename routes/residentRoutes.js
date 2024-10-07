import express from 'express';
import {createResident, getResidents, updateResident, deleteResident, getResidentFromDepNumb} from '../controllers/residentController.js';

const router = express.Router();

router.post('/residents', createResident);
router.get('/residents', getResidents);
router.put('/residents/:id', updateResident);
router.delete('/residents/:id', deleteResident);
router.get('/residents/department/:departmentNumber', getResidentFromDepNumb);

export default router;
