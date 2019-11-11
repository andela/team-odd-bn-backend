import dotenv from 'dotenv';
import {
  users
} from '../database/models';
import HashedPassword from '../helpers/hashPassword';
import tokenGenerator from '../helpers/authenticateToken';

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
      return res.status(201).json({
        message: 'User created successfully',
        data
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
export default UserController;
