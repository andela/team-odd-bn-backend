import dotenv from 'dotenv';
import AuthenticateToken from '../../helpers/AuthenticateToken';

dotenv.config();

const { passwordEnv } = process.env;

const mockData = {
  users: {
    firstName: 'Yannick',
    lastName: 'Jamson',
    email: 'jamson@gmail.com',
    password: passwordEnv
  },
  veryfyEmailUser: {
    id: 1,
    firstName: 'Eric',
    lastName: 'Nayo.',
    email: 'hezronchelimo.hc@gmail.com',
    password: passwordEnv

  },
  usersSignin: {
    email: 'jamson@gmail.com',
    password: passwordEnv,
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

};

export const superAdminToken = AuthenticateToken.signToken(mockData.newSuperAdmin);
export default mockData;
