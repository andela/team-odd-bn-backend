
import HttpStatus from 'http-status-codes';
import Response from './Response';
import { users } from '../database/models';
import AuthenticateToken from './AuthenticateToken';


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

      users.findOrCreate({
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
      done(null, data);
    } catch (error) {
      done(error, false, error.message);
    }
  }

  /**
   * oauth social
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} successSocialSignUp success message
   * @returns {object} object
   */
  static OAuthSocial(req, res, successSocialSignUp) {
    const token = AuthenticateToken.signToken(req.user);
    const {
      id, email, firstName, lastName, signupType, isVerified
    } = req.user;
    const data = {
      id, email, firstName, lastName, signupType, isVerified, token
    };
    return Response.successMessage(req, res, successSocialSignUp, data, HttpStatus.OK);
  }
}

export default UserHelper;
