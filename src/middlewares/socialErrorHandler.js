import Customize from '../helpers/Customize';

const socialErrorHandler = (error, req, res, next) => {
  if (error) {
    return Customize.errorMessage(req, res, 'Authentication error', 400);
  }
  next();
};

export default socialErrorHandler;
