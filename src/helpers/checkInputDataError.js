import { validationResult } from 'express-validator';
import Customize from './Customize';

const checkInputDataError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors.map(err => err.msg);
    return Customize.errorMessage(req, res, errorMessage, 400);
  }
  return next();
};


export default checkInputDataError;
