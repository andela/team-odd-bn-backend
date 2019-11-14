import dotenv from 'dotenv';

dotenv.config();
const { passwordEnv } = process.env;
const users = {
  firstName: 'Yannick',
  lastName: 'Jamson',
  email: 'jamson@gmail.com',
  password: passwordEnv
};

const usersSignin = {
  email: 'jamson@gmail.com',
  password: passwordEnv,
};

const usersWrongInfo = {
  email: 'jamson@example.com',
  password: passwordEnv,
};

const usersAccountNotMatch = {
  email: 'jamson@gmail.com',
  password: 'empty pwd',
};

const wrongEmail = {
  email: 'feke@feke.ux',
  password: 'empty pwd',
};


export {
  users,
  usersSignin,
  usersWrongInfo,
  usersAccountNotMatch,
  wrongEmail,
};
