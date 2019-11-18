import dotenv from 'dotenv';
import isUserExist from '../middlewares/FindUsers';
import { users, profile } from '../database/models';
import HashedPassword from '../helpers/HashPassword';
import AuthenticateToken from '../helpers/AuthenticateToken';
import Customize from '../helpers/Customize';

dotenv.config();
/**
 * @export
 * @class UserController
 */
class UserController {
  /**
   * User can be able to sign up
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof UserController
   * @returns {object} data
   */
  static async signUp(req, res) {
    try {
      const hashedPassword = HashedPassword.hashPassword(req.body.password);
      const {
        firstName,
        lastName,
        email
      } = req.body;

      const newUser = await users.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
      const {
        password,
        ...data
      } = newUser.dataValues;
      const token = AuthenticateToken.signToken(data);
      data.token = token;
      return Customize.successMessage(req, res, 'User created successfully', token, 201);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  /**
  * User can be able to sign in
  * @description POST /api/auth/signin
  * @static
  * @param {object} req request object
  * @param {object} res response object
  * @returns {object} data
  */
  static async signin(req, res) {
    const { result } = req;
    const { password: pwd, ...data } = result.dataValues;
    const token = AuthenticateToken.signToken(data);
    return Customize.successMessage(req, res, 'Successfuly login', token, 200);
  }

  /**
* User can update his/her profile
* @description POST /api/auth/signin
* @static
* @param {object} req request object
* @param {object} res response object
* @returns {object} data
*/
  static async updateProfile(req, res) {
    const { id, email } = req.user;
    const profileUpdate = await profile.update(
      {
        gender: 'male',
        birtDate: '20191112',
        preferedLanguage: 'English',
        preferedLcurrency: 'USD',
        address: 'Kigali',
        department: 'IT',
        bio: 'Software Enginner'

      },
      {
        where: {
          userId: id
        }
      }
    );
    if (profileUpdate[0]) {
      // Check if record exists in db
      console.log('================= SAVED ===========');
    } else {
      console.log('================= NOT SAVED ===========');
    }
  }
}

export default UserController;
