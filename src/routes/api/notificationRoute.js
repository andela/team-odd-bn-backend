import express from 'express';
import verifyToken from '../../middlewares/verifyToken';
import NotificationController from '../../controllers/NotificationController';
import Validate from '../../middlewares/Validate';
import checkInputDataError from '../../middlewares/checkInputDataError';
import isUserVerified from '../../middlewares/isUserVerified';


const notificationRoute = express.Router();

/**
 * @swagger
 *
 * /notifications/markRead:
 *    patch:
 *      summary: User can mark all notifications as read
 *      tags: [Notifications]
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *          description: Please input user token
 *          schema:
 *              type: string
 *          example: XXXXXXXX.XXXXXXXXXX.XXXXXXX
 *          minimum: 1
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Notifications'
 *      responses:
 *        "201":
 *          description: Created
 *        "400":
 *          description: Input error
 *        "401":
 *          description: Unauthorized
 *        "403":
 *          description: Forbidden
 *
 * components:
 *    schemas:
 *      Notifications:
 *        type: object
 *        required:
 *          - notificationIds
 *        properties:
 *          notificationIds:
 *            type: array
 *        example:
 *           notificationIds: [1,2,3,4,5]
 *
 */
notificationRoute
  .patch(
    '/markRead',
    verifyToken,
    isUserVerified,
    Validate.validateNotificationIdRules(),
    checkInputDataError,
    NotificationController.markNotificationsAsRead
  );

/**
 * @swagger
 *
 * /notifications/markRead/:notificationId:
 *    patch:
 *      summary: User can mark all notifications as read
 *      tags: [Notifications]
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *          description: Please input user token
 *          schema:
 *              type: string
 *          example: XXXXXXXX.XXXXXXXXXX.XXXXXXX
 *          minimum: 1
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Notifications'
 *      responses:
 *        "201":
 *          description: Created
 *        "400":
 *          description: Input error
 *        "401":
 *          description: Unauthorized
 *        "403":
 *          description: Forbidden
 *
 * components:
 *    schemas:
 *      Notifications:
 *        type: object
 *        required:
 *          - notificationIds
 *        properties:
 *          notificationIds:
 *            type: array
 *        example:
 *           notificationIds: [1,2,3,4,5]
 *
 */
notificationRoute
  .patch(
    '/markRead/:notificationId',
    verifyToken,
    isUserVerified,
    Validate.validateNotificationIdRules(),
    checkInputDataError,
    NotificationController.markNotificationsAsRead
  );


export default notificationRoute;
