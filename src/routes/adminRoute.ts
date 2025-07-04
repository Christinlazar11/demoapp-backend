import { Router } from 'express';
import { adminLogin, getAllSubmissions, updateSubmissionStatus,  } from '../controllers/admin/adminController';
import dotenv from 'dotenv'
import { authenticateAdmin } from '../middleware/authenticationMiddleware';
dotenv.config();
const router = Router();


router.post('/login', adminLogin);
router.get('/submissions', authenticateAdmin,getAllSubmissions);
router.patch('/submissions/:id/status',authenticateAdmin,updateSubmissionStatus);

export default router;