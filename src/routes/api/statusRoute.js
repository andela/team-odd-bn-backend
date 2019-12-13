import express from 'express';
import verifyToken from '../../middlewares/verifyToken';
import isUserVerified from '../../middlewares/isUserVerified';
import StatusController from '../../controllers/StatusController';

const statusRoute = express.Router();

const { getAllStatus } = StatusController;

/**
 * @swagger
 *
 * /status:
 *    get:
 *      summary: Get all status types
 *      tags: [Status]
 *      parameters:
 *        - name: token
 *          in: header
 *          description: enter token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Status types retrieved successfully
 *        "500":
 *          description: Internal servor error
 */
statusRoute
  .get('/',
    verifyToken,
    isUserVerified,
    getAllStatus);
export default statusRoute;
