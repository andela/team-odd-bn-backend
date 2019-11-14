import Customize from '../helpers/Customize';
import { tripRequest, cities, tripRequestCities } from '../database/models';
/**
 * @export
 * @class ValidateOneWayTrip
 */
export default class ValidateOneWayTrip {
/**
   * validate one-way trip
   * @static
   * @param {object} req response Object
   * @param {object} res request Object
   * @param {object} next next
   * @memberof ValidateOneWayTrip
   * @returns {object} data
   */
  static async validateOnewayData(req, res, next) {
    const userId = req.user.id;
    const { city } = req.body;
    const cityId = parseInt(city, 10);

    try {
      const isLocationExist = await cities.findOne({ where: { id: cityId } });

      const isReqExist = await tripRequest.findAll({
        where: {
          userId, status: 'pending'
        },
        raw: true
      });
      if (!isLocationExist) {
        return Customize.errorMessage(req, res, 'Location not found', 404);
      }
      if (isReqExist.length > 0) {
        const isCityExist = await tripRequestCities.findOne({
          where: {
            cityId, tripRequestId: isReqExist[0].id
          },
          raw: true
        });
        if (isCityExist) {
          return Customize.errorMessage(req, res, 'requested already', 409);
        }
      }
      next();
    } catch (err) {
      return Customize.successMessage(req, res, 'Server Error', err.message, 500);
    }
  }
}
