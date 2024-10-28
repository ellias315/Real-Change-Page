import { Router } from 'express';
// import { middle_login, middle_register } from '../middleware/authMiddleware';
import { register, login, me } from '../controllers/authController';

const router = Router();

// Registration route
router.post('/me', me);
router.post('/login', login);
router.post('/register', register);
// Login route

export default router;