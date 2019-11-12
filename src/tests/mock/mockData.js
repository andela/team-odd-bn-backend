import dotenv from 'dotenv';

dotenv.config();
const { passwordEnv } = process.env;
const mockdata = {
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
  }
};

export default mockdata;
