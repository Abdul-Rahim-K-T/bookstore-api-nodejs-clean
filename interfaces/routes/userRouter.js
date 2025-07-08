import { Router } from 'express';
import authMiddleware from '../../infrastructure/middleware/authMiddleware.js';
import { UserRepository } from '../../infrastructure/db/userRepository.js';
import { UserUsecase } from '../../usecases/userUsecase.js';
import { UserController } from '../controllers/userControllers.js';


const router = Router();

// Dependency Injection
const userRepo = new UserRepository();
const userUsecase = new UserUsecase(userRepo);
const controller = new UserController(userUsecase);


/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User management and authentication
 */

// Route
/**
 * @swagger
 * /api/users/signup:
 *  post:
 *    summary: Regisger a new user
 *    tags: [Users]
 *    requestBody:
 *      requird: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *                type: string
 *                example: John Doe
 *              email:
 *                type: string
 *                example: Jhon Doe
 *              password:
 *                type: string
 *                example: secret123
 *    responses:
 *      201:
 *        description: User created successfully
 *      500:
 *        description: Signup failed
 */
router.post('/signup', controller.signup);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login and get JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', controller.login);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Failed to fetch users
 */
router.get('/', controller.getAllUsers);
/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user based on JWT
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/me', authMiddleware,controller.getMe);

export default router;