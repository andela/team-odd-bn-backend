import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import ErrorHandler from './middlewares/ErrorHandler';


const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Barefoot Nomad.'
}));
app.use('/', router);

app.use('*', ErrorHandler.methodError, ErrorHandler.serverError, ErrorHandler.updateLogFile);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on PORT ${port}....`);
});
export default app;
