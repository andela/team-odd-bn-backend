import dotenv from 'dotenv';
import Response from './Response';
import { users } from '../database/models';
import AuthenticateToken from './AuthenticateToken';
import UserService from '../services/UserService';

dotenv.config();

/**
 * @export
 * @class userHelper
 */
class UserHelper {
  /**
   * Verify user role
   * @param {req} req request
   * @param {roles} roles roles
   * @returns {object} object
   */
  static async userRoleType(req, roles) {
    const { roleId } = req.user;
    const result = await roles.findOne({ where: { id: roleId } });
    const { id: dbRoleId } = result.dataValues;
    return dbRoleId;
  }

  /**
   * User can be able to via social media
   * @param {object} accessToken response
   * @param {object} refreshToken response
   * @param {object} profile objet
   * @param {object} signupTypeParameter string
   * @param {object} done callback
   * @returns {object} object
   */
  static async socialCallBack(accessToken, refreshToken, profile, signupTypeParameter, done) {
    try {
      const data = {
        id: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        signupType: signupTypeParameter,
        isVerified: true
      };
      const {
        email, firstName, lastName, signupType, isVerified
      } = data;

      const socialUser = await users.findOrCreate({
        where: { email },
        defaults: {
          firstName,
          lastName,
          email,
          password: null,
          signupType,
          isVerified
        }
      });
      const { password, ...userInfo } = socialUser[0].dataValues;
      const newToken = AuthenticateToken.signToken(userInfo);
      done(null, newToken);
    } catch (error) {
      done(error, false, error.message);
    }
  }

  /**
   * oauth social
   * @param {object} req request object
   * @param {object} res response object
   * @returns {object} object
   */
  static OAuthSocial(req, res) {
    const socialInfo = JSON.stringify({ signupType: req.user.signupType, token: req.user });
    return res.redirect(`${process.env.REDIRECT_SOCIAL_AUTH_DATA_URL}/?info=${socialInfo}`);
  }
}

export default UserHelper;
