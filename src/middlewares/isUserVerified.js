import { users } from '../database/models';

const isUserVerified = async (req, res, next) => {
  const { email } = req.user;
  const isUserExist = await users.findOne({ where: { email, isVerified: true } });
  if (!isUserExist) {
    return res.status(401).json({ error: 'Your email is not verified, please verify your email first' });
  }
  next();
};
export default isUserVerified;
