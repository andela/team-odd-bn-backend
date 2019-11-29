import { users } from '../database/models';
import Customize from '../helpers/Customize';

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
    return Customize.errorMessage(req, res, 'You are not the owner of the trip', 409);
  }
  next();
};

export const IsTripApproved = async (req, res, next) => {
  if (req.row.statusId === 2) {
    return Customize.errorMessage(req, res, 'The trip is already approved', 409);
  }
  next();
};


export default findOneUser;
