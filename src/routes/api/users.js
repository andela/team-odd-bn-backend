import userController from '../../controllers/users.controller';
import validateUser from '../../middlewares/ValidateUser';
import isUserExist from '../../middlewares/findUser';

const router = require('express').Router();

const { validateSignup } = validateUser;
router.post('/auth/signup', validateSignup, isUserExist, userController.signUp);
/**
 * @swagger
 *
 * /auth/signup:
 *    post:
 *      summary: User can signup
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "201":
 *          description: A user schema
 */

export default router;
