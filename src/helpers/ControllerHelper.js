import HttpStatus from 'http-status-codes';
import Customize from './Customize';
import emailHelper from './EmailHelper';
import { tripRequests, trips, users } from '../database/models';
import AuthenticateToken from './AuthenticateToken';


/**
 * @export
 * @class ControllerHelper
 */
class ControllerHelper {
  /**
   * User can be able to make trip requests
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} tripTypeId trip type ID
   * @memberof TripController
   * @returns {object} data
   */
  static async tripControllerHelper(req, res, tripTypeId) {
    try {
      const itinerary = req.body.itinerary ? req.body.itinerary : [req.body];
      const userId = req.user.id;
      const newTrip = await tripRequests.create({
        userId, statusId: 1, tripTypeId
      });
      const request = await tripRequests.findOne({ where: { userId } });
      itinerary.forEach(async (item) => {
        await trips.create({
          tripRequestId: request.dataValues.id,
          originId: item.originId,
          destinationId: item.destinationId,
          reason: item.reason,
          startDate: item.startDate,
          returnDate: item.returnDate
        });
      });
      emailHelper.approveEmailHelper(req, process.env.MANAGER_EMAIL);
      return Customize.successMessage(req, res, 'Trip requested successfully', newTrip, 201);
    } catch (err) {
      return Customize.errorMessage(req, res, err.message, 500);
    }
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
    return Customize.successMessage(req, res, successSocialSignUp, data, HttpStatus.OK);
  }
}

export default ControllerHelper;
