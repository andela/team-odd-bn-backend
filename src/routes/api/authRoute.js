import express from 'express';
import UserController from '../../controllers/UserController';
import isUserExist from '../../middlewares/FindUsers';
import ValidateUser from '../../middlewares/ValidateUser';

const authRouter = express.Router();

authRouter.post('/signup', ValidateUser.signupRules(), ValidateUser.validateSignUp, isUserExist, UserController.signUp);
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
 *
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - password
 *        properties:
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string

 *        example:
 *           firstName: dnffd
 *           lastName: fkbndf
 *           email: fname.lname@andela.com
 *           password: yourpassword
 *
 */

export default authRouter;
