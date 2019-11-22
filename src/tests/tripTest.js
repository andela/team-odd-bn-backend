import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import mockData from './mock/mockData';
import tripMockData from './mock/tripMockData';
import AuthenticateToken from '../helpers/AuthenticateToken';

chai.use(chaiHttp);
chai.should();

dotenv.config();

const {
  ...data
} = mockData.trips;
const { invalidToken } = mockData;

const userToken = AuthenticateToken.signToken(mockData.aUser);

describe('Request One way trip test', () => {
  it('should be able to create one way trip', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(tripMockData.correctOneWayTrip)
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to create one way trip when no token inserted', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(data)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to create one way trip when invalid token', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(data)
      .set('token', invalidToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        done();
      });
  });
});
