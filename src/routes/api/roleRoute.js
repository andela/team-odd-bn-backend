import { Router } from 'express';
import verifyToken from '../../middlewares/verifyToken';
import verifyUserRoles from '../../middlewares/VerifyUserRoles';
import verifyInputRoles from '../../middlewares/verifyInputRoles';
import Validate from '../../middlewares/Validate';
import RoleController from '../../controllers/RoleController';
import isRoledifferent from '../../middlewares/isRoledifferent';
import checkInputDataError from '../../middlewares/checkInputDataError';
import UserController from '../../controllers/UserController';

const roleRoute = Router();

roleRoute
  .put(
    '/role/:id',
    verifyToken,
    Validate.roleRequest(),
    checkInputDataError,
    verifyInputRoles,
    isRoledifferent,
    verifyUserRoles.isSuperAdmin,
    RoleController.assignRole
  );

/**
 * @swagger
 *
 * /users/role/{id}:
 *    put:
 *      summary: Super admin is allowed to assign roles
 *      tags: [Roles]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Role'
 *      parameters:
 *        - name: token
 *          in: header
 *          description: enter super admin token
 *          required: true
 *          schema:
 *            type: string
 *        - name: id
 *          in: path
 *          description: role ID
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *
 *      responses:
 *        "201":
 *          description: Role assigned successfuly
 *        "400":
 *          description: Bad request
 *        "403":
 *          description: Forbiden error
 *
 * components:
 *    schemas:
 *      Role:
 *        type: object
 *        required:
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *
 */


roleRoute
  .get(
    '/role',
    RoleController.availableRoles
  );

/**
 * @swagger
 *
 * /users/role:
 *    get:
 *      summary: Available roles
 *      tags: [Roles]
 *      responses:
 *        "200":
 *          description: Success
 *        "404":
 *          description: Role Not found
 */

roleRoute
  .get(
    '/all',
    verifyToken,
    UserController.availableUsers
  );

/**
 * @swagger
 *
 * /users/all:
 *    get:
 *      summary: Available users
 *      tags: [Users]
 *      parameters:
 *        - name: token
 *          in: header
 *          description: enter token
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: Users available successfuly
 *        "404":
 *          description: Users are not found
 */


export default roleRoute;
