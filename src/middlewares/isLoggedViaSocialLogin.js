import Response from '../helpers/Response';
import { users } from '../database/models';

const isLoggedViaSocialLogin = async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    const findSignupType = await users.findOne({ where: { email } });
    if (findSignupType) {
      const { signupType, createdAt } = findSignupType.dataValues;
      if (signupType === 'google' || signupType === 'facebook') {
        const message = `Dear user, you are requested to login again with ${signupType} account.`;
        const data = {
          signupType,
          email,
          createdAt,
        };
        return Response.successMessage(req, res, message, data, 300);
      }
    }
  }
  return next();
};

export default isLoggedViaSocialLogin;
