import { users } from '../database/models';

const findOneUser = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await users.findOne({ where: { email } });

  if (isUserExist) {
    return res.status(409).json({ error: 'User already exist' });
  }
  next();
};
export default findOneUser;
