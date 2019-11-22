import dotenv from 'dotenv';

dotenv.config();

const tripMockData = {
  aUser: {
    id: 1,
    email: 'demo@gmail.com'
  },
  wrongOriginIdFormat: {
    originId: 'asdfgt',
    destinationId: 2,
    reason: 'blablabla',
    tripTypeId: 2,
    startDate: '2019-11-21',
    returnDate: '2019-12-30',
  },
  wrongDestinationIdFormat: {
    originId: 1,
    destinationId: 'sartyu',
    reason: 'blablabla',
    tripTypeId: 2,
    startDate: '2019-11-21',
    returnDate: '2019-12-30',
  },
  wrongReasonIdFormat: {
    originId: 1,
    destinationId: 2,
    reason: 'b',
    tripTypeId: 2,
    startDate: '2019-11-21',
    returnDate: '2019-12-30',
  },
  wrongTripTypeIdFormat: {
    originId: 1,
    destinationId: 2,
    reason: 'blalala',
    tripTypeId: 'sdfghjk',
    startDate: '2019-11-21',
    returnDate: '2019-12-30',
  },
  wrongStartDateFormat: {
    originId: 1,
    destinationId: 2,
    reason: 'blalala',
    tripTypeId: 2,
    startDate: '20-11-2019',
    returnDate: '2019-12-30',
  },
  wrongReturnDateFormat: {
    originId: 1,
    destinationId: 2,
    reason: 'blalala',
    tripTypeId: 2,
    startDate: '20-11-2019',
    returnDate: '2019-12-30',
  },

  earlyReturnDate: {
    originId: 1,
    destinationId: 2,
    reason: 'blalala',
    tripTypeId: 2,
    startDate: '2019-12-30',
    returnDate: '2019-12-02',
  },
  pastStartDate: {
    originId: 1,
    destinationId: 2,
    reason: 'blalala',
    tripTypeId: 2,
    startDate: '20-11-2013',
    returnDate: '2019-12-30',
  },
  wrongTripData: {
    originId: 'awgh',
    destinationId: 'cvfghjuki',
    reason: 'b',
    tripTypeId: 'sertyuikjhnbv',
    startDate: '20-11-2013',
    returnDate: '2014-12-30',
  },
  wrongTripTypeId: {
    originId: 1,
    destinationId: 2,
    reason: 'blablabla',
    tripTypeId: 9,
    startDate: '2019-11-21',
    returnDate: '2019-12-30',
  },
  misisngOriginId: {
    destinationId: 2,
    reason: 'blablabla',
    tripTypeId: 9,
    startDate: '2019-11-21',
    returnDate: '2019-12-30',
  },
  correctTrip: {
    originId: 2,
    destinationId: 3,
    reason: 'blablabla',
    tripTypeId: 2,
    startDate: '2020-12-22',
    returnDate: '2020-12-30',
  },
  correctOneWayTrip: {
    originId: 3,
    destinationId: 1,
    reason: 'blablabla',
    startDate: '2020-03-02',
    returnDate: '2020-05-12',
  },
  wrongToken: {
    token: 'dfcgvhbjnm,',
  }


};

export default tripMockData;
