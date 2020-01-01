import Response from '../helpers/Response';
import StatusService from '../services/StatusService';


const { getStatus } = StatusService;
/**
 * @exports
 * @class StatusController
 */
class StatusController {
  /**
   * Get all status types
   * @static
   * @param {object} req  request object
   * @param {object} res response object
   * @memberof SearchController
   * @returns {object} data
   */
  static async getAllStatus(req, res) {
    const status = await getStatus();
    return Response.successMessage(req, res, 'Successfully retrieved all status types', status, 200);
  }
}
export default StatusController;
