import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import router from './routes';
import socketIo from './helpers/socketIo';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/', router);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Barefoot Nomad.'
}));

app.use('/static', express.static(path.join(__dirname, 'public')));

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on PORT ${port}....`);
});

socketIo(server);


export default app;
