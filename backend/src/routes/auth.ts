import { Router } from 'express';

const router = Router();

import { login, refresh, logout, getUser } from '../controllers/authController.js';

router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/get-user', getUser);

export default router;