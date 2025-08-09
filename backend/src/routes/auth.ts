import { Router } from 'express';

const router = Router();

import { login, register, refresh, logout, getUser } from '../controllers/authController.js';

router.post('/login', login);
router.post('/register', register);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/get-user', getUser);

export default router;