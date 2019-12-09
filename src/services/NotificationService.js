import dotenv from 'dotenv';
import CommonQueries from './CommonQueries';
import {
  tripRequests,
  status,
  notifications,
  userProfile,
} from '../database/models';
import { notificationEvents } from '../helpers/notificationConfig';

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

    const userTripsRequestsObject = {
      where: { id: tripRequestId }
    };
    const tripRequestInfo = await CommonQueries.findOne(tripRequests, userTripsRequestsObject);
    const { userId, statusId, updatedAt } = tripRequestInfo.dataValues;
    const tripStatus = await CommonQueries.findOne(status, { where: { id: statusId } });
    const { status: statusName } = tripStatus.dataValues;
    const message = `your trip request has been ${statusName.toLowerCase()}`;

    const result = await NotificationService.saveNotification({
      userId,
      tripRequestId,
      message
    });

    const data = {
      notificationId: result.dataValues.id,
      tripRequestId,
      reason,
      updatedAt
    };
    notificationEvents('approve_reject_notification', { message, data });
  }

  /**
   * generate notification
   * @static
   * @param {object} dataNotification pass object to save in Table
   * @memberof NotificationService
   * @returns {object} data
   */
  static async saveNotification(dataNotification) {
    const data = await CommonQueries.create(notifications, dataNotification);
    return data;
  }

  /**
   * Send notification to manager when trip edited
   * @static
   * @param {object} req get user information
   * @memberof NotificationService
   * @returns {object} data
   */
  static async editedTripNotification(req) {
    const { params, user } = req;
    const managerById = {
      where: { userId: user.id }
    };

    const userTripsRequestsObject = {
      where: { id: params.tripRequestId }
    };

    const tripRequestInfo = await CommonQueries.findOne(tripRequests, userTripsRequestsObject);
    const userProfileInfo = await CommonQueries.findOne(userProfile, managerById);
    const { managerId } = userProfileInfo.dataValues;
    const { updatedAt } = tripRequestInfo.dataValues;
    const message = `Trip request no ${params.tripRequestId} has been edited`;

    const result = await NotificationService.saveNotification({
      userId: managerId,
      tripRequestId: params.tripRequestId,
      message
    });

    const data = {
      notificationId: result.dataValues.id,
      tripRequestId: params.tripRequestId,
      updatedAt
    };
    notificationEvents('edit_trip_notification', { message, data });
  }

  /**
   * Send notification to a user or manager when post added
   * @static
   * @param {object} req get user information
   * @memberof NotificationService
   * @returns {object} data
   */
  static async addCommentNotification(req) {
    const { user, params } = req;
    const tripRequestInfoObject = {
      where: {
        id: params.tripRequestId
      }
    };

    const tripRequestInfo = await CommonQueries.findOne(tripRequests, tripRequestInfoObject);
    const { userId } = tripRequestInfo;
    const lineManagerIdObject = {
      where: {
        userId
      }
    };
    const userProfileInfo = await CommonQueries.findOne(userProfile, lineManagerIdObject);
    const { managerId } = userProfileInfo.dataValues;
    const message = `The Trip request no ${params.tripRequestId} has been commented on`;
    let receiverId;

    if (userId === user.id) {
      receiverId = managerId; // is a manage
    } else {
      receiverId = userId; // is a user
    }

    const result = await NotificationService.saveNotification({
      userId: receiverId,
      commentsId: params.tripRequestId,
      message
    });

    const data = {
      notificationId: result.dataValues.id,
      commentsId: params.tripRequestId,
      updatedAt: result.dataValues.updatedAt
    };
    notificationEvents('post_comment_notification', { message, data });
  }
}

export default NotificationService;
