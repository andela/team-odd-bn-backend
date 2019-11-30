import dotenv from 'dotenv';
import { users, roles } from '../database/models';
import CommonQueries from './CommonQueries';

dotenv.config();

/**
 * @exports
 * @class RoleController
 */
class RoleService {
  /**
   * assign role to users
   * @static
   * @description PUT /api/users/role/:id
   * @param {object} req request object
   * @memberof RoleService
   * @returns {object} data
   */
  static async assignRole(req) {
    const { id } = req.params;
    const { email } = req.body;

    const usersUpdateObject = [
      { roleId: id },
      { where: { email } }
    ];
    const newRoleObject = {
      where: { id }
    };
    await CommonQueries.update(users, usersUpdateObject);

    const newRole = await CommonQueries.findOne(roles, newRoleObject);
    return newRole;
  }

  /**
   * available roles
   * @static
   * @description GET /api/users/
   * @memberof RoleService
   * @returns {object} data
   */
  static async availableRoles() {
    const rolesObject = {
      attributes: ['id', 'type']
    };
    const allRoles = await CommonQueries.findAll(roles, rolesObject);
    return allRoles;
  }
}

export default RoleService;
