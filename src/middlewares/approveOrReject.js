import { userProfile as userProfiles, tripRequests } from '../database/models';
import Response from '../helpers/Response';

const operateAcceptOrReject = async (req, res, next) => {
  const { id } = req.user;
  const { tripRequestId } = req.params;
  const users = await userProfiles.findAll({
    where: { managerId: id }
  });
  const newArray = [];
  const allUserId = users.map(i => newArray.push(i));

  const findRequest = await tripRequests.findOne({
    where: { userId: allUserId, id: tripRequestId }, raw: true
  });

  const { statusId } = findRequest;
  const { status } = req.query;

  if (status === 'reject') {
    if (statusId === 3) {
      return Response.errorMessage(req, res, 'this request has already been rejected', 409);
    }
    const rejectIt = await tripRequests.update(
      { statusId: 3 },
      {
        where: {
          userId: findRequest.userId,
          id: tripRequestId
        }
      }
    );
    return !rejectIt[0] ? Response.errorMessage(req, res, 'This request is not belongs to this Manager', 403) : next();
  }
  if (statusId === 2) {
    return Response.errorMessage(req, res, 'this request has already been approved', 409);
  }
  const approveIt = await tripRequests.update(
    { statusId: 2 },
    {
      where: {
        userId: findRequest.userId,
        id: tripRequestId
      }
    }
  );
  return !approveIt[0] ? Response.errorMessage(req, res, 'This request is not belongs to this Manager', 403) : next();
};

export default operateAcceptOrReject;
