
import dotenv from 'dotenv';
import Response from '../helpers/Response';
import NotificationService from '../services/NotificationService';

const { markNotificationAsRead } = NotificationService;
dotenv.config();
/**
 * @exports
 * @class AccommodationController
 */
class AccommodationController {
  /**
  * Travel Admin can be able to create accommodation facility
   * @static
   * @param {object} req  request object
   * @param {object} res response object
   * @memberof AccommodationController
   * @returns {object} data
   */
  static async markNotificationsAsRead(req, res) {
    try {
      const { notificationIds } = req.body;
      const { notificationId } = req.params;
      const notificationArr = req.params.notificationId
        ? notificationId
        : notificationIds.filter(id => id === parseInt(id, 10));
      await markNotificationAsRead(notificationArr);
      return Response.successMessage(req, res, 'Notification marked as read successfully', '', 201);
    } catch (err) {
      return Response.errorMessage(req, res, 'Server Error', 500);
    }
  }
}

export default AccommodationController;
