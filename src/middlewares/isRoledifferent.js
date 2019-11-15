import Customize from '../helpers/Customize';
import { users } from '../database/models';

const isRoledifferent = async (req, res, next) => {
  const { email: existingEmail } = req.user;
  const { email: assignEmail } = req.body;
  let status;

  if (existingEmail === assignEmail) {
    status = 403;
    return Customize.errorMessage(req, res, 'you are not allowed to change your access', status);
  }

  const result = await users.findOne({ where: { email: assignEmail } });
  const { roleId } = result.dataValues;

  if (parseInt(req.params.id, 10) === roleId) {
    return Customize.errorMessage(req, res, 'you have assigned role already', 409);
  }
  next();
};

export default isRoledifferent;
