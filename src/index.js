import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import socketIo from 'socket.io';
import sendNotif from './helpers/socketIo';
import router from './routes';
import tokenHelpers from './middlewares/ForgotPasswordMiddlewares';
import { sendNotification } from './helpers/notificationConfig';


const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/static', express.static(path.join(__dirname, 'public')));

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on PORT ${port}....`);
});

const io = socketIo(server);

const connectedClients = {};
io.use((socket, next) => {
  const { token } = socket.handshake.query;
  try {
    const userData = tokenHelpers.decodeTokenHelper(token);
    if (userData) {
      const clientKey = Number.parseInt(userData.id, 10);
      connectedClients[clientKey] = connectedClients[clientKey] || [];
      connectedClients[clientKey].push(socket.id);
    }
    next();
  } catch (error) {
    return (error);
  }
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedClients = connectedClients;
  next();
});

app.use('/', router);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Barefoot Nomad.'
}));
app.use('*', (req, res) => res.status(404).send({
  message: 'Ooops route does not exist!'
}));


export default app;
