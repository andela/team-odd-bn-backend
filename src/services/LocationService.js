import {
  cities
} from '../database/models';
import CommonQueries from './CommonQueries';

/**
   * @export
   * @class LocationService
   */
class LocationService {
  /**
     * user edit trips
     * @static
     * @param {object} req pass request body
     * @memberof LocationService
     * @returns {object} either an error or data
     */
  static async getLocations() {
    const result = CommonQueries.findAll(cities, {});
    return result;
  }
}

export default LocationService;
