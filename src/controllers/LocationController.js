import dotenv from 'dotenv';
import Response from '../helpers/Response';
import { cities } from '../database/models';
import LocationService from '../services/LocationService';

dotenv.config();
/**
 * @export
 * @class LocationController
 */
class LocationController {
  /**
   * An admin should be able to add locations
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof LocationController
   * @returns {object} data
   */
  static async saveLocation(req, res) {
    try {
      const { name } = req.body;

      const newLocation = await cities.create({ city: name });

      return Response.successMessage(req, res, 'Location posted successfully', newLocation, 201);
    } catch (err) {
      return Response.errorMessage(req, res, err.message, 500);
    }
  }

  /**
   * An admin should be able to add locations
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @memberof LocationController
   * @returns {object} data
   */
  static async getAllCities(req, res) {
    try {
      const result = await LocationService.getLocations();
      if (result.length === 0) {
        return Response.errorMessage(req, res, 'No city is available at the moment', 404);
      }
      return Response.successMessage(req, res, 'Location retrieved','', 200);

    } catch (err) {
      console.log(err);
      
      return Response.errorMessage(req, res, err.message, 500);
    }
  }
}
export default LocationController;
