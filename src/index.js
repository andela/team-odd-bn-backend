import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.json());
app.use('/', router);

app.use('/', router);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Barefoot Nomad.'
}));
app.use('*', (req, res) => res.status(404).send({
  message: 'Ooops route does not exist!'
}));


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on PORT ${port}....`);
});
export default app;
