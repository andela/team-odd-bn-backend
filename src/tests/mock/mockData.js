import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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
  secondUsers: {
    id: 3,
    lastName: 'Jamson',
    email: 'jamson1@gmail.com',
  },
  locations: {
    name: 'kigali'
  },
  trips: {
    city: 1,
    reason: 'I want too live thereee',
    startDate: 2000 - 10 - 10
  },
  userToken: jwt.sign({
    id: 3,
    lastName: 'Jamson',
    email: 'jamson1@gmail.com',
  }, process.env.JWT_KEY),
  invalidToken: 'jfdgvfjfjdbfjbdjfbdjbfjdbfjdb'

};

export default mockData;
