import { users, userProfile } from '../database/models';
import CommonQueries from './CommonQueries';
import HashPassword from '../helpers/HashPassword';
/**
 * Find a specific user.
 * @param {object} object The user object.
 * @returns {object} A specific user object.
 */
class UserService {
  /**
   * email templates
   * @static
   * @param {Object} object user object
   * @returns {Object} an existing user
   */
  static async getAUser(object) {
    const oneUser = await users.findOne({
      where: object
    });
    return oneUser;
  }

  /**
   * User can be able to sign up
   * @static
   * @param {object} req  request object
   * @param {object} firstName  request object
   * @param {object} lastName  request object
   * @param {object} email  request object
   * @memberof UserService
   * @returns {object} data
   */
  static async signUp(req, firstName, lastName, email) {
    const hashedPassword = HashPassword.hashPassword(req.body.password);

    const newUserObject = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isVerified: false,
      signupType: 'Barefoot'
    };

    const newUser = await CommonQueries.create(users, newUserObject);

    const { id } = newUser.dataValues;

    const createNewUserProfileObject = { userId: id };
    await CommonQueries.create(userProfile, createNewUserProfileObject);

    return newUser;
  }

  /**
   * Verify email
   * @static
   * @param {Object} req the request object
   * @returns {Object} response
   */
  static async verifyEmail(req) {
    const verifyObject = [
      { isVerified: true },
      { where: { id: req.params.id } }
    ];
    await CommonQueries.update(users, verifyObject);
  }

  /**
   * @static
   * @description GET /api/users/all
   * @returns {Object} response
   */
  static async availableUsers() {
    const allUsersObj = {
      attributes: ['id', 'firstName', 'lastName', 'email', 'roleId']
    };
    const allUsers = CommonQueries.findAll(users, allUsersObj);
    return allUsers;
  }

  /**
    * User can update his/her profile
    * @description POST /api/v1/user/profile-settings
    * @static
    * @param {object} req request object
    * @returns {object} UserService
  */
  static async updateProfile(req) {
    const { id } = req.user;
    const userObject = {
      where: {
        id
      }
    };
    const updateUser = await CommonQueries.findOne(users, userObject);

    let { firstName, lastName } = updateUser.dataValues;
    const {
      gender, birthDate, address, imageURL, department, managerId,
      bio, userFirstName, userLastName,
    } = req.body;

    firstName = userFirstName || firstName;
    lastName = userLastName || lastName;

    const data = {
      firstName,
      lastName,
      gender,
      birthDate,
      address,
      imageURL,
      department,
      managerId,
      bio
    };

    const userUpdateProfileObject = [{
      gender,
      birthDate,
      address,
      imageURL,
      department,
      managerId,
      bio
    },
    {
      where: {
        userId: id
      }
    }];
    const profileUpdate = await CommonQueries.update(userProfile, userUpdateProfileObject);

    const userUpdateObject = [{
      firstName,
      lastName
    },
    {
      where: {
        id
      }
    }];
    await CommonQueries.update(users, userUpdateObject);

    const result = [profileUpdate[0], data];
    return result;
  }

  /**
  * User can view his/her profile
  * @description POST /api/v1/user/view-profile
  * @static
  * @param {object} req request object
  * @returns {object} UserService
*/
  static async viewProfile(req) {
    const { id } = req.user;
    const viewUserProfileObject = {
      attributes: ['gender', 'birthDate', 'address', 'imageURL', 'department', 'managerId', 'bio'],
      include: [{
        model: users,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'email']
      }],
      where: { userId: id },
    };
    const userData = await CommonQueries.findOne(userProfile, viewUserProfileObject);

    return userData;
  }
}

export default UserService;
