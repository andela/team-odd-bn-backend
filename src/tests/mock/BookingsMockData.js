import dotenv from 'dotenv';

dotenv.config();
const { TEST_PASSWORD_ENV } = process.env;
const BookingsMockData = {
  userBooker: {
    firstName: 'Yck',
    lastName: 'willo',
    email: 'william@gmail.com',
    password: '$2b$10$fZ7o3DAOl6nRk/nXJ.Fe1.DHmh9q5rByeodydnM22nmtIKBpw07yW',
    roleId: 3,
    isVerified: true,
    signupType: 'default',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  userSetProfile: {
    gender: 'male',
    birthDate: '1997-12-15',
    address: 'Kigali',
    imageURL: '/images/avatar.jpg',
    department: 'IT',
    managerId: 6,
    bio: 'I have been a christian since 2014, Christ as my savior'
  },
  makeTrip: {
    originId: 3,
    destinationId: 1,
    reason: 'blablabla',
    startDate: '2019-10-02',
    returnDate: '2019-10-12',
  },

  bookAccommodation: {
    roomType: '2 bed 1 living room',
    roomId: 1,
    checkInDate: '2030-11-30',
    checkOutDate: '2030-12-30'
  },
  invalidRoomType: {
    roomType: '33 bed 1 living room',
    roomId: 1,
    checkInDate: '2030-11-30',
    checkOutDate: '2030-12-30'
  },
  bookedAccommodation: {
    roomType: '2 bed 1 living room',
    roomId: 1,
    checkInDate: '2030-11-30',
    checkOutDate: '2030-12-30'
  },
  someTookAccommodation: {
    roomType: '2 bed 1 living room',
    roomId: 1,
    checkInDate: '2030-12-10',
    checkOutDate: '2030-12-30'
  },
  checkInDateGreaterThanCheckOutDate: {
    roomType: '2 bed 1 living room',
    roomId: 1,
    checkInDate: '2030-12-15',
    checkOutDate: '2030-12-10'
  },
  checkInDateEqualsToCheckOutDate: {
    roomType: '2 bed 1 living room',
    roomId: 1,
    checkInDate: '2030-12-15',
    checkOutDate: '2030-12-15'
  },
  userSign: {
    email: 'jamson@gmail.com',
    password: 'Demo@123'
  },
  noRoomIdProvided: {
    checkInDate: '2030-12-10',
    checkOutDate: '2030-12-17'
  },
  managerSignin: {
    email: 'manager.email@gmail.com',
    password: TEST_PASSWORD_ENV
  }
};
export default BookingsMockData;
