import Customize from '../helpers/Customize';
import { roles, users } from '../database/models';
import userRoleType from '../helpers/userRoleType';

/**
 * @exports
 * @class VerifyUserRoles
 */
class VerifyUserRoles {
  /**
   * verify super admin
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next response object
   * @memberof VerifyUserRoles
   * @returns {object} access
  */
  static async isSuperAdmin(req, res, next) {
    const { id } = req.user;
    const dbRoleId = await userRoleType(req, roles);
    if (dbRoleId !== 1) {
      return Customize.errorMessage(req, res, 'you don\'t have super admin access', 403);
    }
    const isRealSuperAdmin = await users.findOne({ where: { id } });
    if (!isRealSuperAdmin) {
      return Customize.errorMessage(req, res, 'Invalid super admin credentials', 403);
    }
    next();
  }

  /**
   * verify travel team member
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next response object
   * @memberof VerifyUserRoles
   * @returns {object} access
  */
  static async isTravelTeamMember(req, res, next) {
    const dbRoleId = await userRoleType(req, roles);
    if (dbRoleId !== 5) {
      return Customize.errorMessage(req, res, 'you are not a travel team member', 403);
    }
    next();
  }

  /**
   * verify travel team administrator
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next response object
   * @memberof VerifyUserRoles
   * @returns {object} access
  */
  static async isTravelAdministrator(req, res, next) {
    const dbRoleId = await userRoleType(req, roles);
    if (dbRoleId !== 4) {
      return Customize.errorMessage(req, res, 'you are not a travel administrator', 403);
    }
    next();
  }

  /**
   * verify a requester
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next response object
   * @memberof VerifyUserRoles
   * @returns {object} access
  */
  static async isRequester(req, res, next) {
    const dbRoleId = await userRoleType(req, roles);
    if (dbRoleId !== 7) {
      return Customize.errorMessage(req, res, 'you are not a requester', 403);
    }
    next();
  }

  /**
   * verify a manager
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next response object
   * @memberof VerifyUserRoles
   * @returns {object} access
  */
  static async isManager(req, res, next) {
    const dbRoleId = await userRoleType(req, roles);
    if (dbRoleId !== 6) {
      return Customize.errorMessage(req, res, 'you are not manager', 403);
    }
    next();
  }

  /**
   * verify a user
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next response object
   * @memberof VerifyUserRoles
   * @returns {object} access
  */
  static async isUser(req, res, next) {
    const dbRoleId = await userRoleType(req, roles);
    if (dbRoleId !== 3) {
      return Customize.errorMessage(req, res, 'you are not a user', 403);
    }
    next();
  }
}

export default VerifyUserRoles;
