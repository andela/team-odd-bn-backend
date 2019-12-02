import Response from '../helpers/Response';
import { users } from '../database/models';

const isManager = async (req, res, next) => {
  const { managerId } = req.body;
  const manager = await users.findOne({
    where: {
      id: managerId,
      roleId: 6,
    }
  });
  if (manager) { return next(); }
  return Response.errorMessage(req, res, 'Unknown line manager', 404);
};

export default isManager;
