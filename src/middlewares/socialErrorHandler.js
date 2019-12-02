import Response from '../helpers/Response';

const socialErrorHandler = (error, req, res, next) => {
  if (error) {
    return Response.errorMessage(req, res, 'Authentication error', 400);
  }
  next();
};

export default socialErrorHandler;
