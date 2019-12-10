import Response from '../helpers/Response';

const validateSearchQueries = (req, res, next) => {
  const { query } = req;
  const allKeys = Object.keys(query);
  if (allKeys.length === 0) {
    return Response.errorMessage(req, res, 'Please provide a search query key parameter', 400);
  }

  const searchKeys = allKeys.map(key => {
    if (key === 'originId'
    || key === 'destinationId'
    || key === 'startDate'
    || key === 'returnDate'
    || key === 'firstName'
    || key === 'status'
    || key === 'tripType') {
      return true;
    }
    return false;
  });

  const invalidKeys = searchKeys.filter(key => key === false);
  if (invalidKeys.length > 0) {
    return Response.errorMessage(req, res, 'You provided an invalid search query key(s) parameter.Your search key should be either originId, destinationId, startDate, returnDate, firstName, status, or tripType', 400);
  }

  if (query.originId === ''
  || query.destinationId === ''
  || query.startDate === ''
  || query.returnDate === ''
  || query.firstName === ''
  || query.tripType === '') {
    return Response.errorMessage(req, res, 'Please provide a search value parameter', 400);
  }
  return next();
};

export default validateSearchQueries;
