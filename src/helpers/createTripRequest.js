import dotenv from 'dotenv';
import Customize from './Customize';
import database from '../database/models';

dotenv.config();

const newtripRequest = (req, res, tripTypeId) => {
  const { body, user } = req;
  body.userId = user.id;
  const { userId, ...requestCitiesBody } = body;
  const newTripRequest = database.tripRequests.build({ tripTypeId, userId });
  newTripRequest.save()
    .then(newRequest => {
      const tripRequestId = newRequest.id;
      const newTripRequestCities = database.tripRequestCities.build(
        { tripRequestId, ...requestCitiesBody }
      );
      newTripRequestCities.save().then(newTripRequestCity => {
        const data = newRequest;
        data.dataValues.newTripRequestCity = newTripRequestCity;
        Customize.successMessage(
          req, res, 'Request has been received! Please await manager\'s approval!', data, 201
        );
      });
    }).catch(error => Customize.errorMessage(req, res, error.message, 500));
};

export default newtripRequest;
