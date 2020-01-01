import { status } from '../database/models';
import CommonQueries from './CommonQueries';


/**
 * @exports
 * @class StatusService
 */
class StatusService {
  /**
 * Get all status
 * @static
 * @description GET /api/v1/status
 * @param {object} req request object
 * @memberof SearchService
 * @returns {object} data
 */
  static async getStatus() {
    const queryObject = {
      attributes: ['id', 'status']
    };
    const allStatus = await CommonQueries.findAll(status, queryObject);
    return allStatus;
  }
}

export default StatusService;
