import database from '../database/models';
/**
 * Find a specific user.
 * @param {object} object The user object.
 * @returns {object} A specific user object.
 */
class Users {
  /**
   * email templates
   * @static
   * @param {Object} object user object
   * @returns {Object} an existing user
   */
  static async getAUser(object) {
    return database.users.findOne({
      where: object
    }).then(user => user);
  }
}

export default Users;
