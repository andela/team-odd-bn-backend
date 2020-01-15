import dotenv from 'dotenv';
import AuthenticateToken from '../../helpers/AuthenticateToken';

dotenv.config();

const { TEST_PASSWORD_ENV } = process.env;

const mockData = {
  resendEmailData: {
    email: 'jamson@gmail.com'
  },
  users: {
    firstName: 'Yannick',
    lastName: 'Jamson',
    email: 'jamson@gmail.com',
    password: TEST_PASSWORD_ENV,
    signupType: 'Barefoot',
    isVerified: true,
  },
  usersUnverifiedSignup: {
    firstName: 'Yannick',
    lastName: 'Jamson',
    email: 'jaon@gmail.com',
    password: TEST_PASSWORD_ENV,
    signupType: 'Barefoot',
  },
  users2UnverifiedSignup: {
    firstName: 'Yannick',
    lastName: 'Jamson',
    email: 'jon@gmail.com',
    password: TEST_PASSWORD_ENV,
    signupType: 'Barefoot',
  },
  usersUnverifiedSignin: {
    firstName: 'Yannick',
    lastName: 'Jamson',
    email: 'jaon@gmail.com',
    password: TEST_PASSWORD_ENV,
  },
  veryfyEmailUser: {
    id: 1,
    firstName: 'Eric',
    lastName: 'Nayo.',
    email: 'hezronchelimo.hc@gmail.com',
    password: TEST_PASSWORD_ENV,
    signupType: 'Barefoot',
    isVerified: false
  },
  usersSignin: {
    email: 'jamson@gmail.com',
    password: TEST_PASSWORD_ENV,
  },
  testUser: {
    email: 'test@email.com',
    password: TEST_PASSWORD_ENV,
  },
  isManager: {
    email: 'manager.email@gmail.com',
    password: TEST_PASSWORD_ENV,
  },

  wrongManager: {
    email: 'demo@gmail.com',
    password: TEST_PASSWORD_ENV,
  },
  userCorrectInfo: {
    email: 'demo@demo.com',
    password: TEST_PASSWORD_ENV,
  },
  usersWrongInfo: {
    email: 'jamson@example.com',
    password: TEST_PASSWORD_ENV,
  },
  usersAccountNotMatch: {
    email: 'jamson@gmail.com',
    password: 'empty pwd',
  },
  wrongEmail: {
    email: 'feke@feke.ux',
    password: 'empty pwd',
  },
  socialUser: {
    id: '101381754221104952698',
    email: 'victorkarangwa4@gmail.com',
    firstName: 'Victor',
    lastName: 'KARANGWA',
    signupType: 'google',
    isVerified: true
  },
  aUser: {
    id: 1,
    email: 'demo@gmail.com'
  },
  user1: {
    email: 'jean@gmail.com',
    password: TEST_PASSWORD_ENV
  },
  user2: {
    email: 'manager.email@gmail.com',
    password: TEST_PASSWORD_ENV
  },
  wrongEmailFormat: {
    email: 'demo.com',
  },

  wrongPasswordFormat: {
    password: 'demo12',
    confirmPassword: 'demo12',
  },

  passwordDontMatch: {
    password: 'Demo@123',
    confirmPassword: 'Hemo@123',
  },

  passwordsMatch: {
    password: 'Demo@123',
    confirmPassword: 'Demo@123',
  },

  anyEmptyPasswordField: {
    password: '',
    confirmPassword: 'Demo@123',
  },

  existingEmail: {
    email: 'jamson@gmail.com',
  },

  nonExistingUser: {
    email: 'janedoe@gmail.com',
  },

  emptyEmailField: {
    email: '',
  },
  secondUsers: {
    id: 3,
    lastName: 'Jamson',
    email: 'jamson1@gmail.com',
  },
  locations: {
    name: 'kigali'
  },
  invalidToken: 'jfdgvfjfjdbfjbdjfbdjbfjdbfjdb',
  socialToken: { access_token: 'xxx.xxx.xxx' },
  superAdmin: {
    email: process.env.SUPER_ADMIN_EMAIL,
    password: TEST_PASSWORD_ENV
  },
  assignNewUser: {
    firstName: 'Eric',
    lastName: 'Testman',
    email: 'eric@gmail.com',
    password: TEST_PASSWORD_ENV
  },
  fekeEmail: {
    email: 'bad@email.feke'
  },
  wrongRoleId: {
    id: 10
  },
  newSuperAdminLogin: {
    email: 'admin@gmail.com',
    password: TEST_PASSWORD_ENV
  },
  newSuperAdmin: {
    id: 4,
    firstName: 'another',
    lastName: 'admin',
    roleId: 1,
    email: 'admin@gmail.com',
    password: TEST_PASSWORD_ENV
  },
  locationData: {
    name: 'Naiccrobi',
  },
  location2Data: {
    name: 'Kamccpala',
  },


  unknownUserUpdate: {
    gender: 'male',
    birthDate: '1997-12-15',
    address: 'Kigali',
    imageURL: '/images/avatar.jpg',
    department: 'IT',
    managerId: 6,
    bio: 'I have been a christian since 2014, Christ as my savior'
  },
  invalidManager: {
    gender: 'male',
    birthDate: '1997-12-15',
    address: 'Kigali',
    imageURL: '/images/avatar.jpg',
    department: 'IT',
    managerId: 2,
    bio: 'I have been a christian since 2014, Christ as my savior'
  },
  userInvalidImage: {
    gender: 'male',
    birthDate: '1997-12-15',
    preferedLanguage: 'English',
    preferedCurrency: 'rwf',
    address: 'Kigali',
    imageURL: '/images/avatar.j',
    department: 'IT',
    managerId: 5,
    bio: 'I have been a christian since 2014, Christ as my savior'
  },
  superAdminToken: AuthenticateToken.signToken({
    id: 4,
    firstName: 'another',
    lastName: 'admin',
    roleId: 1,
    email: 'admin@gmail.com',
    password: TEST_PASSWORD_ENV
  }),
  userComment:
  { comment: 'Everyone in the company should request for this trip' },
  managersUser: {
    email: 'manager.email@gmail.com',
    password: TEST_PASSWORD_ENV
  },
  userMakeTrip: {
    email: 'demo@gmail.com',
    password: TEST_PASSWORD_ENV
  },
  approveRequest: {
    reason: 'yes we agree with your reason'
  },
  facebook_feke_user: {
    id: 10,
    email: 'feke@facebook.domain',
    firstName: 'Patrick',
    lastName: 'john',
  },
  google_feke_user: {
    id: 10,
    email: 'feke@google.domain',
    firstName: 'Patrick',
    lastName: 'john',
  },
  fekeData: {
    id: 1,
    email: 'example@email.com'
  },
};

export default mockData;
