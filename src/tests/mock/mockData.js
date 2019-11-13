import dotenv from 'dotenv';

dotenv.config();
const { passwordEnv } = process.env;
const users = {
  firstName: 'Yannick',
  lastName: 'Jamson',
  email: 'jamson@gmail.com',
  password: passwordEnv
};

export default { users };
