import dotenv from 'dotenv';
import AuthenticateToken from '../../helpers/AuthenticateToken';

dotenv.config();

const { passwordEnv, MANAGERPASSWORD, PASSWORDFORALL } = process.env;

const mockData = {
  users: {
    firstName: 'Yannick',
    lastName: 'Jamson',
    email: 'jamson@gmail.com',
    password: passwordEnv,
    signupType: 'Barefoot',
    isVerified: true
  },
  veryfyEmailUser: {
    id: 1,
    firstName: 'Eric',
    lastName: 'Nayo.',
    email: 'hezronchelimo.hc@gmail.com',
    password: passwordEnv,
    signupType: 'Barefoot',
    isVerified: false

  },
  usersSignin: {
    email: 'jamson@gmail.com',
    password: passwordEnv,
  },
  userCorrectInfo: {
    email: 'demo@demo.com',
    password: 'barefoot@Nomad123',
  },
  usersWrongInfo: {
    email: 'jamson@example.com',
    password: passwordEnv,
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
    password: process.env.SUPER_ADMIN_REAL_PASSWORD
  },
  assignNewUser: {
    firstName: 'Eric',
    lastName: 'Testman',
    email: 'eric@gmail.com',
    password: passwordEnv
  },
  fekeEmail: {
    email: 'bad@email.feke'
  },
  wrongRoleId: {
    id: 10
  },
  newSuperAdminLogin: {
    email: 'admin@gmail.com',
    password: 'admin1234'
  },
  newSuperAdmin: {
    id: 4,
    firstName: 'another',
    lastName: 'admin',
    roleId: 1,
    email: 'admin@gmail.com',
    password: passwordEnv
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
    managerId: 5,
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
  managersUser: {
    email: 'maiyo.brian@andela.com',
    password: MANAGERPASSWORD
  },
  userMakeTrip: {
    email: 'demo@gmail.com',
    password: PASSWORDFORALL
  },
  approveRequest: {
    reason: 'yes we agree with your reason'
  }
};

export const superAdminToken = AuthenticateToken.signToken(mockData.newSuperAdmin);
export default mockData;
