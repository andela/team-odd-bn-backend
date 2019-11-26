import { users as user, userProfile as userProfiles, tripRequests } from '../database/models';
import Customize from '../helpers/Customize';

const isManagerAccess = async (req, res, next) => {
  const { id } = req.user;
  const getRole = await user.findAll({ where: { roleId: 6, id } });
  const [{ dataValues }] = getRole;
  return dataValues.roleId !== 6
    ? Customize.successMessage(req, res, 'You do not have access to perform this action as a manager', 403) : next();
};

const validateAcceptOrReject = async (req, res, next) => {
  const { id } = req.user;
  const { tripRequestId } = req.params;
  const users = await userProfiles.findAll({ where: { managerId: id } });
  const newArray = [];
  const allUserId = users.map((i) => newArray.push(i));

  const findRequest = await tripRequests.findOne({
    where: { userId: allUserId, id: tripRequestId }, raw: true
  });

  const { statusId } = findRequest;
  const { status } = req.query;

  if (status === 'reject') {
    if (statusId === 3) {
      return Customize.errorMessage(req, res, 'this request already rejected', 409);
    }
    const rejectIt = await tripRequests.update({ statusId: 3 },
      { where: { userId: findRequest.userId, id: tripRequestId } });
    return !rejectIt[0] ? Customize.errorMessage(req, res, 'This request is not belongs to this Manager', 403) : next();
  }
  if (statusId === 2) {
    return Customize.errorMessage(req, res, 'this request already approved', 409);
  }
  const approveIt = await tripRequests.update({ statusId: 2 },
    { where: { userId: findRequest.userId, id: tripRequestId } });
  return !approveIt[0] ? Customize.errorMessage(req, res, 'This request is not belongs to this Manager', 403) : next();
};

export { isManagerAccess, validateAcceptOrReject };
