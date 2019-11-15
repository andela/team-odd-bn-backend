import Customize from '../helpers/Customize';
import { users } from '../database/models';
import HashPassword from '../helpers/HashPassword';

const validateCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await users.findOne({ where: { email } });
  let status;

  if (!result) {
    status = 400;
    return Customize.errorMessage(req, res, 'Email not found', status);
  }

  const isPasswordMatch = HashPassword.matchingPassword(password, result);

  if (!isPasswordMatch) {
    status = 400;
    return Customize.errorMessage(req, res, 'Email and password not match', status);
  }

  req.result = result;
  next();
};

export default validateCredentials;
