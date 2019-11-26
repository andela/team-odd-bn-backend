import { userProfile as userProfiles, tripRequests } from '../database/models';
import Customize from '../helpers/Customize';

const isManagerRequest = async (req, res, next) => {
  const { id } = req.user;
  const { tripRequestId } = req.params;
  const users = await userProfiles.findAll({ where: { managerId: id }, raw: true });
  const newArray = [];
  const allUserId = users.map((i) => newArray.push(i));

  const findRequest = await tripRequests.findOne({
    where: { userId: allUserId, id: tripRequestId }, raw: true
  });
  return !findRequest ? Customize.errorMessage(req, res, 'this request not belongs to this manager', 403) : next();
};

export default isManagerRequest;
