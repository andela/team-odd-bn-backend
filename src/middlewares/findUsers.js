import Response from '../helpers/Response';
import { users, tripRequests } from '../database/models';
import CommonQueries from '../services/CommonQueries';

const findOneUser = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await users.findOne({ where: { email } });

  if (isUserExist) {
    return res.status(409).json({ error: 'User already exist' });
  }
  next();
};

export const IsOwnerOfTrip = async (req, res, next) => {
  if (req.user.id !== req.row.userId) {
    return Response.errorMessage(req, res, 'You are not the owner of the trip', 409);
  }
  next();
};

export const IsTripApproved = async (req, res, next) => {
  if (req.row.statusId === 2) {
    return Response.errorMessage(req, res, 'The trip is already approved', 409);
  }
  next();
};


export const commentAccess = async (req, res, next) => {
  const { id } = req.user;
  const { tripRequestId } = req.params;
  const userObj = {
    where: {
      id,
      roleId: 6,
    }
  };
  const tripObj = {
    where: {
      id: tripRequestId,
      userId: id,
    }
  };
  const isManager = await CommonQueries.findOne(users, userObj);

  const isRequester = await CommonQueries.findOne(tripRequests, tripObj);

  if (isManager || isRequester) {
    return next();
  }
  return Response.errorMessage(req, res, 'You should be either a requester or a manager', 403);
};
export default findOneUser;
