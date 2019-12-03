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
  },
  users: {
    firstName: 'Travel',
    lastName: 'Admin',
    email: 'travelAdmin@gmail.com',
    password: TEST_PASSWORD_ENV,
    signupType: 'Barefoot',
    isVerified: true
  },
  usersSignin: {
    email: 'travelAdmin@gmail.com',
    password: TEST_PASSWORD_ENV,
  },
  unVerifiedusersSignin: {
    email: 'jon@gmail.com',
    password: TEST_PASSWORD_ENV,
  },
  correctAccomodationData: {
    name: 'Queens Palace',
    cityId: 1,
    address: 'fghj',
    googleCoordinates: '-1.959007, 30.087124',
    imageUrls: ['p.jpg', 'l.jpg', 'k.jpg'],
    description: ' Queens palace is the best you could ever get',
    rooms: [{ name: '1', roomType: 'single' }, { name: '2', roomType: 'single' }, { name: '3', roomType: 'single' }]
  },
  wrongImageUrlAccomodationData: {
    name: 'Queens Palace',
    cityId: 1,
    address: 'fghj',
    googleCoordinates: '-1.959007, 30.087124',
    imageUrls: ['p.jpjg', 'l.jpvgffg', 'k.jpkg'],
    description: ' Queens palace is the best you could ever get',
    rooms: [{ name: '1', roomType: 'single' }, { name: '2', roomType: 'single' }, { name: '3', roomType: 'single' }]
  },
  wrongAddressAccomodationData: {
    name: 'Q',
    cityId: 1,
    address: 'fghj',
    googleCoordinates: '-1.959007, 30.087124',
    imageUrls: ['p.jpg', 'l.jpg', 'k.jpg'],
    description: ' Queens palace is the best accomodation facility you could ever get',
    rooms: [{ name: '1', roomType: 'single' }, { name: '2', roomType: 'single' }, { name: '3', roomType: 'single' }]
  },
  wrongDescriptionAccomodationData: {
    name: 'hhjyugb',
    cityId: 1,
    address: 'fghjj',
    googleCoordinates: '-1.959007, 30.087124',
    imageUrls: ['p.jpg', 'l.jpg', 'k.jpg'],
    description: 'ghfhu',
    rooms: [{ name: '1', roomType: 'single' }, { name: '2', roomType: 'single' }, { name: '3', roomType: 'single' }]
  },
  wrongNameAccomodationData: {
    name: 'Q',
    cityId: 1,
    address: 'fghj',
    googleCoordinates: '-1.959007, 30.087124',
    imageUrls: ['p.jpg', 'l.jpg', 'k.jpg'],
    description: ' Queens palace is the best accomodation facility you could ever get',
    rooms: [{ name: '1', roomType: 'single' }, { name: '2', roomType: 'single' }, { name: '3', roomType: 'single' }]
  },
  WrongImagesAccomodationData: {
    name: 'Queens Palace',
    cityId: 1,
    address: 'fghj',
    googleCoordinates: '-1.959007, 30.087124',
    imageUrls: ['p.jp', 'l.jg', 'k.g'],
    description: ' Queens palace is the best accomodation facility you could ever get',
    rooms: [{ name: '1', roomType: 'single' }, { name: '2', roomType: 'single' }, { name: '3', roomType: 'single' }]
  },
  wrongCoordinatesRangeAccomodationData: {
    name: 'Queens Palace',
    cityId: 1,
    address: 'fghj',
    googleCoordinates: '-1200.959007, 30.087124',
    imageUrls: ['p.jpg', 'l.jpg', 'k.jpg'],
    description: ' Queens palace is the best accomodation facility you could ever get',
    rooms: [{ name: '1', roomType: 'single' }, { name: '2', roomType: 'single' }, { name: '3', roomType: 'single' }]
  },
  wrongGoogleCoordinatesAccomodationData: {
    name: 'Queens Palace',
    cityId: 1,
    address: 'fghj',
    googleCoordinates: 'dfsdfsdf',
    imageUrls: ['p.jpg', 'l.jpg', 'k.jpg'],
    description: ' Queens palace is the best accomodation facility you could ever get',
    rooms: [{ name: '1', roomType: 'single' }, { name: '2', roomType: 'single' }, { name: '3', roomType: 'single' }]
  },
  wrongCityIdAccomodationData: {
    name: 'Queens Palace',
    cityId: ' dkjn',
    address: 'fghj',
    googleCoordinates: '-1.959007, 30.087124',
    imageUrls: ['p.jpg', 'l.jpg', 'k.jpg'],
    description: ' Queens palace is the best accomodation facility you could ever get',
    rooms: [{ name: '1', roomType: 'single' }, { name: '2', roomType: 'single' }, { name: '3', roomType: 'single' }]
  },
  wrongRoomNameAccomodationData: {
    name: 'Queehjgns Palace',
    cityId: 1,
    address: 'fgjhgghj',
    googleCoordinates: '-1.959007, 30.087124',
    imageUrls: ['p.jpg', 'l.jpg', 'k.jpg'],
    description: ' Queens palace is the best accomodation facility you could ever get',
    rooms: [{ name: '', roomType: 'single' }, { name: '2', roomType: 'single' }, { name: '3', roomType: 'single' }]
  },
  wrongRoomTypeAccomodationData: {
    name: 'Queens Palace',
    cityId: 1,
    address: 'fghj',
    googleCoordinates: '-1.959007, 30.087124',
    imageUrls: ['p.jpg', 'l.jpg', 'k.jpg'],
    description: ' Queens palace is the best accomodation facility you could ever get',
    rooms: [{ name: '1', roomType: 's' }, { name: '2', roomType: 'single' }, { name: '3', roomType: 'single' }]
  },

  emptyRoomAccomodationData: {
    name: '4thQueens Palace',
    cityId: 1,
    address: 'fgffhj',
    googleCoordinates: '-1.959037, 30.087124',
    imageUrls: ['p.jpg', 'l.jpg', 'k.jpg'],
    description: ' Queens palace is the best accomodation facility you could ever get',
    rooms: []
  },
  emptyImageUrlsAccomodationData: {
    name: '5thQueens Palace',
    cityId: 1,
    address: 'fffghj',
    googleCoordinates: '-1.955007, 30.087124',
    imageUrls: [],
    description: ' Queens palace is the best accomodation facility you could ever get',
    rooms: [{ name: '1', roomType: 's' }, { name: '2', roomType: 'single' }, { name: '3', roomType: 'single' }]
  },
};
export default accommodationMockData;
