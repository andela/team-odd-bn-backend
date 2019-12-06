import dotenv from 'dotenv';
import CommonQueries from './CommonQueries';
import {
  tripRequests,
  status,
  notifications
} from '../database/models';
import eventEmitters from '../helpers/eventEmitters';

dotenv.config();

/**
 * @exports
 * @class NotificationService
 */
class NotificationService {
  /**
   * generate notification
   * @static
   * @param {object} req request object
   * @param {object} reason why to approve or reject
   * @memberof NotificationService
   * @returns {object} data
   */
  static async ApprovedOrRejectedTripNotification(req, reason) {
    const { tripRequestId } = req.params;
    const { id: lineManagerId } = req.user;

    const userTripsRequestsObject = {
      where: { id: tripRequestId }
    };

    const tripRequestInfo = await CommonQueries.findOne(tripRequests, userTripsRequestsObject);
    const { userId, statusId, updatedAt } = tripRequestInfo.dataValues;
    const tripStatus = await CommonQueries.findOne(status, { where: { id: statusId } });
    const { status: statusName } = tripStatus.dataValues;
    const message = `your trip request has been ${statusName.toLowerCase()}`;

    const data = {
      tripRequestId,
      status: statusName,
      reason,
      updatedAt
    };

    await CommonQueries.create(notifications, {
      userId,
      tripRequestId,
      managerId: lineManagerId,
      message
    });
    eventEmitters.emit('notification_message', JSON.stringify({ message, data }));
  }
}

export default NotificationService;
