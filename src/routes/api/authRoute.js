import express from 'express';
import UserController from '../../controllers/UserController';
import isUserExist from '../../middlewares/FindUsers';
import ValidateUser from '../../middlewares/ValidateUser';
import validateCredentials from '../../middlewares/validateCredentials';


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

authRouter
  .post(
    '/signin',
    ValidateUser.signinRules(),
    ValidateUser.validateSignUp,
    validateCredentials,
    UserController.signin
  );
/**
* @swagger
*
* /auth/signin:
*    post:
*      summary: User login
*      tags: [Users]
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Signin'
*      responses:
*        "200":
*          description: 'A user schema'
*        "400":
*          description: 'Bad request'
*        "500":
*          description: 'Server Error'
* components:
*   schemas:
*     Signin:
*       type: "object"
*       properties:
*         email:
*           type: string
*         password:
*           type: string
*       required:
*         - 'email'
*         - 'password'
*
*/

export default authRouter;
