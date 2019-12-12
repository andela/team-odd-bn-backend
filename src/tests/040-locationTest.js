import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import locationMockData from './mock/locationMockData';
import mockData from './mock/mockData';


chai.use(chaiHttp);
chai.should();

dotenv.config();

let token;


describe('Location test', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.usersSignin)
      .end((err, res) => {
        token = res.body.data;

        done();
      });
  });
  it('should be able to post a location', (done) => {
    chai.request(app).post('/api/v1/location').set('token', token).send(locationMockData.locationData)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should be able to post a location', (done) => {
    chai.request(app).post('/api/v1/location').set('token', token).send(locationMockData.location2Data)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should be able to post a location', (done) => {
    chai.request(app).post('/api/v1/location').set('token', token).send(locationMockData.location2Data)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should be able to get all locations', (done) => {
    chai.request(app).get('/api/v1/location').set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
});
