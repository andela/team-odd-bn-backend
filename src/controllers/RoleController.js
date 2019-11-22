import dotenv from 'dotenv';
import { users, roles } from '../database/models';
import Customize from '../helpers/Customize';

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
      const { id } = req.params;
      const { email } = req.body;

      await users.update(
        { roleId: id },
        { where: { email } }
      );
      const newRole = await roles.findOne({ where: { id } });
      return Customize.successMessage(req, res, 'Role assigned successfully', { role: newRole }, 201);
    } catch (error) {
      return Customize.errorMessage(req, res, error.message, 500);
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
    const allRoles = await roles.findAll({ attributes: ['id', 'type'] });
    return Customize.successMessage(req, res, 'Available roles', allRoles, 200);
  }
}

export default RoleController;
