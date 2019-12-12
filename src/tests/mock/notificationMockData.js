import dotenv from 'dotenv';

dotenv.config();

const { TEST_PASSWORD_ENV } = process.env;
const notificationMockData = {
  notificationIds: {
    notificationIds: [1, 2, 3, 4, 5, 11]
  },
  inValidNotificationIds: {
    notificationIds: [1, 'kempi', 3, 4, 5, 11]
  },
  nonArrayNotificationIds: {
    notificationIds: 45,
  },
  unVerifiedusersSignin: {
    email: 'jon@gmail.com',
    password: TEST_PASSWORD_ENV,
  },
  userSign: {
    email: 'test@email.com',
    password: TEST_PASSWORD_ENV
  },
};
export default notificationMockData;
