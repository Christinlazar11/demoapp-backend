import { Router } from 'express';
import { createSubmission } from '../controllers/user/submissionController';
const router = Router();
router.post('/submission',createSubmission);
export default router; 