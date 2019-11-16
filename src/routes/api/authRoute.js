import express from 'express';
import UserController from '../../controllers/UserController';
import isUserExist from '../../middlewares/FindUsers';
import ValidateUser from '../../middlewares/ValidateUser';
import validateCredentials from '../../middlewares/validateCredentials';
import Middlewares from '../../middlewares/ForgotPasswordMiddlewares';

const authRouter = express.Router();

const {
  checkForgotPasswordMiddleware,
  checkResetPasswordMiddleware,
  decodeTokenMiddleware
} = Middlewares;

const {
  forgotPasswordController,
  resetPasswordController,
  verifyEmailController,
  resendEmailController,
} = UserController;

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

authRouter.get('/verify-email/:id/:token', verifyEmailController);
/**
 * @swagger
 *
 * /verify-email/:id/:token:
 *    get:
 *      summary: verify email
 *      tags: [Email]
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: 'A response message'
*/

authRouter.post('/forgot-password', Middlewares.forgotPasswordRules(), checkForgotPasswordMiddleware, forgotPasswordController);

/**
 * @swagger
 * /auth/forgot-password:
 *    post:
 *      summary: User receives an email with a reset password link once they hit forgot password
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ForgotPassword'
 *      responses:
 *        "200":
 *          description: 'A user schema'
 *        "400":
 *          description: 'Bad request'
 *        "500":
 *          description: 'Server Error'
 *
 */

authRouter.get('/:id/resend-email', resendEmailController);
/**
 * @swagger
 *
 * /:id/resend-email:
 *    get:
 *      summary: resend email
 *      tags: [Email]
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: 'A response message'
 * components:
 *   schemas:
 *     ForgotPassword:
 *       type: "object"
 *       properties:
 *         email:
 *           type: string
 *       required:
 *         - 'email'
 *
 */
authRouter.patch('/reset-password/:token', decodeTokenMiddleware, Middlewares.resetPasswordRules(), checkResetPasswordMiddleware, resetPasswordController);

/**
 * @swagger
 *
 * /auth/reset-password/{token}:
 *    patch:
 *      summary: User can reset password from the reset password link
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: token
 *          schema:
 *            type: string
 *            example: Qwerty@123
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResetPassword'
 *      responses:
 *        "200":
 *          description: 'A user schema'
 *        "400":
 *          description: 'Bad request'
 *        "500":
 *          description: 'Server Error'
 * components:
 *   schemas:
 *     ResetPassword:
 *       type: "object"
 *       properties:
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *       required:
 *         - 'email'
 *         - 'confirmPassword'
 *
 */
export default authRouter;
