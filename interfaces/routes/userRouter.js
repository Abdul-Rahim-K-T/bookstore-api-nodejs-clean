import { Router } from 'express';
import authMiddleware from '../../infrastructure/middleware/authMiddleware.js';
import { UserRepository } from '../../infrastructure/db/userRepository.js';
import { UserUsecase } from '../../usecases/userUsecase.js';
import { UserController } from '../controllers/userControllers.js';


const router = Router();

// Wiring 
const userRepo = new UserRepository();
const userUsecase = new UserUsecase(userRepo);
const controller = new UserController(userUsecase);

// Route
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/', controller.getAllUsers);
router.get('/me', authMiddleware,controller.getMe);

export default router;