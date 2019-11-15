import dotenv from 'dotenv';

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
    id: '45',
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
    email: 'demo@gmail.com',
  },

  nonExistingUser: {
    email: 'janedoe@gmail.com',
  },

  emptyEmailField: {
    email: '',
  },
};

export default mockData;
