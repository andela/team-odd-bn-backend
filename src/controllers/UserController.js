import dotenv from 'dotenv';
import { users } from '../database/models';
import HashedPassword from '../helpers/HashPassword';
import tokenGenerator from '../helpers/AuthenticateToken';
import customize from '../helpers/Customize';
import Customize from '../helpers/Customize';
import AuthToken from '../helpers/AuthenticateToken';

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
      const token = tokenGenerator.signToken(data);
      data.token = token;
      return customize.successMessage(req, res, 'User created successfully', token, 201);
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
    const token = AuthToken.signToken(data);
    return Customize.successMessage(req, res, 'Successfuly login', token, 200);
  }
}

export default UserController;
