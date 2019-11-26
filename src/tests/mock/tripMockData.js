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
    originId: 4,
    destinationId: 5,
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
  correctOneWayTripDateRange: {
    originId: 5,
    destinationId: 4,
    reason: 'blablabla',
    startDate: '2020-03-02',
    returnDate: '2020-05-12',
  },
  nonLocationsOneWayTrip: {
    originId: 110,
    destinationId: 120,
    reason: 'blablabla',
    startDate: '2020-03-02',
    returnDate: '2020-05-12',
  },
  similarOriginDestinationOneWayTrip: {
    originId: 1,
    destinationId: 1,
    reason: 'blablabla',
    startDate: '2020-03-02',
    returnDate: '2020-05-12',
  },
  wrongOneWayTrip: {
    originId: 3,
    destinationId: 1,
    reason: 'b',
    startDate: '20',
    returnDate: '20',
  },
  wrongDatesOneWayTrip: {
    originId: 1,
    destinationId: 3,
    reason: 'bla bla bla',
    startDate: '2030-03-02',
    returnDate: '2020-05-12',
  },
  wrongToken: {
    token: 'dfcgvhbjnm,',
  },
  oneWaytrip: {
    originId: 1,
    destinationId: 2,
    startDate: '2020-11-20',
    returnDate: '2030-01-10',
    reason: 'Some other good reasons'
  },
  multiCityData: {
    itinerary: [
      {
        originId: 1,
        destinationId: 2,
        startDate: '2029-01-20',
        returnDate: '2030-01-10',
        reason: 'A very good reason'
      },
      {
        originId: 2,
        destinationId: 1,
        startDate: '2029-01-20',
        returnDate: '2030-01-10',
        reason: 'Another very good reason'
      },
    ]
  },
  multiCitySimilarData: {
    itinerary: [
      {
        originId: 1,
        destinationId: 2,
        startDate: '2029-01-20',
        returnDate: '2030-01-10',
        reason: 'A very good reason'
      },
      {
        originId: 1,
        destinationId: 2,
        startDate: '2029-01-20',
        returnDate: '2030-01-10',
        reason: 'Another very good reason'
      },
    ]
  },
  multiCitySameCitiesData: {
    itinerary: [
      {
        originId: 1,
        destinationId: 1,
        startDate: '2029-01-20',
        returnDate: '2030-01-10',
        reason: 'A very good reason'
      },
      {
        originId: 2,
        destinationId: 2,
        startDate: '2029-01-20',
        returnDate: '2030-01-10',
        reason: 'Another very good reason'
      },
    ]
  },
  inValidMultiCityDateData: {
    itinerary: [
      {
        originId: 1,
        destinationId: 2,
        startDate: '2009-01-20',
        returnDate: '2010-01-10',
        reason: 'A very good reason'
      },
      {
        originId: 2,
        destinationId: 1,
        startDate: '2009-01-20',
        returnDate: '2010-01-10',
        reason: 'Another very good reason'
      },
    ]
  },
  inValidMultiCityDate2Data: {
    itinerary: [
      {
        originId: 1,
        destinationId: 2,
        startDate: '2029-01-20',
        returnDate: '2020-01-10',
        reason: 'A very good reason'
      },
      {
        originId: 2,
        destinationId: 1,
        startDate: '2029-01-20',
        returnDate: '2020-01-10',
        reason: 'Another very good reason'
      },
    ]
  },
  inValidMultiCityReasonData: {
    itinerary: [
      {
        originId: 1,
        destinationId: 2,
        startDate: '2029-01-20',
        returnDate: '2030-01-10',
        reason: 'A'
      },
      {
        originId: 2,
        destinationId: 1,
        startDate: '2029-01-20',
        returnDate: '2030-01-10',
        reason: 'A'
      },
    ]
  },
  inValidMultiCityDateFormatData: {
    itinerary: [
      {
        originId: 1,
        destinationId: 2,
        startDate: '202',
        returnDate: '200',
        reason: 'A dfghgn'
      },
      {
        originId: 2,
        destinationId: 1,
        startDate: '202',
        returnDate: '203',
        reason: 'A fgh'
      },
    ]
  },
  nonMultiCityData: {
    itinerary: [
      {
        originId: 30,
        destinationId: 40,
        startDate: '2029-01-20',
        returnDate: '2030-01-10',
        reason: 'A very good reason'
      },
      {
        originId: 40,
        destinationId: 30,
        startDate: '2029-01-20',
        returnDate: '2030-01-10',
        reason: 'Another very good reason'
      },
    ]
  },
  invalidToken: 'jfdgvfjfjdbfjbdjfbdjbfjdbfjdb',

  newMultiCityData: {
    itinerary: [
      {
        originId: 3,
        destinationId: 5,
        startDate: '2020-01-20',
        returnDate: '2021-01-10',
        reason: 'edit me multicity 1'
      },
      {
        originId: 4,
        destinationId: 3,
        startDate: '2022-01-20',
        returnDate: '2023-01-10',
        reason: 'edit me multicity 2'
      },
    ]
  },
  newOneWayTrip: {
    originId: 3,
    destinationId: 4,
    startDate: '2021-11-20',
    returnDate: '2022-01-10',
    reason: 'edit me one-way trip'
  },

  editNewOneWay: {
    originId: 1,
    destinationId: 4,
    startDate: '2022-11-20',
    returnDate: '2023-01-10',
    reason: 'edit me one-way trip'
  }
};

export default tripMockData;
