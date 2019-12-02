import dotenv from 'dotenv';
import Response from '../helpers/Response';
import RoleService from '../services/RoleService';

dotenv.config();

/**
 * @exports
 * @class RoleController
 */
class RoleController {
  /**
   * assign role to users
   * @static
   * @description PUT /api/users/role/:id
   * @param {object} req request object
   * @param {object} res response object
   * @memberof RoleController
   * @returns {object} data
   */
  static async assignRole(req, res) {
    try {
      const newRole = await RoleService.assignRole(req);
      return Response.successMessage(req, res, 'Role assigned successfully', { role: newRole }, 201);
    } catch (error) {
      return Response.errorMessage(req, res, error.message, 500);
    }
  }

  /**
   * available roles
   * @static
   * @description GET /api/users/
   * @param {object} req request object
   * @param {object} res response object
   * @memberof RoleController
   * @returns {object} data
   */
  static async availableRoles(req, res) {
    const allRoles = await RoleService.availableRoles();
    return Response.successMessage(req, res, 'Available roles', allRoles, 200);
  }
}

export default RoleController;
