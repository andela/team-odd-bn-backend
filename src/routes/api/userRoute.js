import express from 'express';
import Validate from '../../middlewares/Validate';
import isManager from '../../middlewares/isManager';
import isUserVerified from '../../middlewares/isUserVerified';
import UserController from '../../controllers/UserController';
import verifyToken from '../../middlewares/verifyToken';
import checkInputDataError from '../../middlewares/checkInputDataError';
import customValidator from '../../middlewares/customValidator';

const userRoute = express.Router();

const { profileUpdateRules } = Validate;
const { isImage } = customValidator;

/**
 * @swagger
 *
 * /auth/google:
 *    post:
 *      summary: User login with google account
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          Logged in with facebook successfully
 */
/**
* @swagger
*
* /users/view-profile:
*   get:
*     summary: Get user profile
*     description: User should be able to fetch his/her profile information
*     tags:
*       - Profiles
*     parameters:
*      - name: token
*        in: header
*        required: true
*        description: user token
*        schema:
*          type: string
*        example: xxxxxxxxx.xxxxxxxxx.xxxxxxxxxx
*        minimum: 1
*     responses:
*       200:
*         description: Profile retrieved successfully
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/
/**
* @swagger
*
* /users/profile-settings:
*   put:
*     summary: User Profile Update
*     description: Edit user profile information
*     tags:
*       - Profiles
*     parameters:
*      - name: token
*        in: header
*        required: true
*        description: user token
*        schema:
*          type: string
*        example: xxxxxxxxx.xxxxxxxxx.xxxxxxxxxx
*        minimum: 1
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               gender:
*                 type: string
*               birthDate:
*                 type: string
*                 format: date
*               address:
*                 type: string
*               department:
*                 type: string
*               lineManager:
*                 type: string
*               bio:
*                 type: string
*     produces:
*         application/json:
*           schema:
*             type: object
*             properties:
*               status:
*                 type: string
*               message:
*                 type: string
*               data:
*                 type: object
*                 properties:
*                   gender:
*                     type: string
*                   birthDate:
*                     type: string
*                     format: date
*                   address:
*                     type: string
*                   department:
*                     type: string
*                   lineManager:
*                     type: string
*                   bio:
*                     type: string
*     responses:
*       201:
*         description: Profile update successfully
*       400:
*         description: Unable to update the profile
*       401:
*         description: Unauthorized
*       500:
*         description: Internal server error
*/

/**
 * @swagger
 *
 * /users/notification:
 *    get:
 *      summary: Available notification for a specific user
 *      tags: [Notifications]
 *      parameters:
 *        - name: token
 *          in: header
 *          description: enter token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Available notifications
 *        "404":
 *          description: Notification not found
 */
userRoute.put('/profile-settings', verifyToken, profileUpdateRules(), checkInputDataError, isManager, isUserVerified, UserController.updateProfile);
userRoute.get('/view-profile', verifyToken, isUserVerified, UserController.viewProfile);
userRoute.get('/notification', verifyToken, isUserVerified, UserController.viewNotification);
userRoute.patch('/logout', verifyToken, UserController.logout);
export default userRoute;
