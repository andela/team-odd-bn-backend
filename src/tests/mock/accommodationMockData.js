import dotenv from 'dotenv';

dotenv.config();

const { TEST_PASSWORD_ENV } = process.env;

const accommodationMockData = {
  ratingUser: {
    email: 'lynnzioka@gmail.com',
    password: TEST_PASSWORD_ENV
  },
  wrongRating: {
    rating: 'rating',
    review: 'Nice place',
    accommodationId: 1,
  },
  wrongReview: {
    rating: 4,
    review: 'r',
    accommodationId: 1,
  },
  wrongAccommodationId: {
    rating: 4,
    review: 'Great ambience',
    accommodationId: 'lkjhg',
  },
  nonexistentAccommodationId: {
    rating: 4,
    review: 'Great ambience',
    accommodationId: 99,
  },
  accomodation: {
    id: 1,
    name: 'Radisson Blue',
    description: 'great nice chill place',
    cityId: 1,
    googleCoordinates: 'cordinates',
    address: 'City Centre',

  },
  correctRating: {
    rating: 4,
    review: 'Great ambience',
    accommodationId: 1,
  }

};

export default accommodationMockData;
