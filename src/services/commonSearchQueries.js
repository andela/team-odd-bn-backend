import { Op } from 'sequelize';
import {
  tripRequests, status, tripTypes, users
} from '../database/models';


const query = (searchQueryParams, id) => ({
  where: {
    ...searchQueryParams.startDate && {
      startDate: {
        [Op.iLike]: `%${searchQueryParams.startDate.trim()}%`
      }
    },
    ...searchQueryParams.returnDate && {
      returnDate: {
        [Op.iLike]: `%${searchQueryParams.returnDate.trim()}%`
      }
    },
    ...searchQueryParams.originId && {
      originId: {
        [Op.eq]: parseInt((searchQueryParams.originId), 10)
      }
    },
    ...searchQueryParams.destinationId && {
      destinationId: {
        [Op.eq]: parseInt((searchQueryParams.destinationId), 10)
      }
    },
  },
  attributes: ['originId', 'destinationId', 'reason', 'startDate', 'returnDate'],
  include: [
    {
      model: tripRequests,
      attributes: ['id'],
      include: [
        {
          model: status,
          where: {
            ...searchQueryParams.status && {
              status: {
                [Op.iLike]: `%${searchQueryParams.status.trim()}%`
              }
            }
          },
          attributes: ['status'],
        },
        {
          model: tripTypes,
          where: {
            ...searchQueryParams.tripType && {
              tripType: {
                [Op.iLike]: `%${searchQueryParams.tripType.trim()}%`
              }
            }
          },
          attributes: ['tripType'],
        },
        {
          model: users,
          where: {
            ...searchQueryParams.firstName && {
              firstName: {
                [Op.iLike]: `%${searchQueryParams.firstName.trim()}%`
              }
            },
            id
          },
          attributes: ['firstName'],
        }
      ]
    }
  ],
});


export default query;
