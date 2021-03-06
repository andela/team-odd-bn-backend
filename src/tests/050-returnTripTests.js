import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import tripMockData from './mock/tripMockData';
import mockData from './mock/mockData';

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

dotenv.config();

let token;


describe('Return trip tests', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.usersSignin)
      .end((err, res) => {
        token = res.body.data;

        done();
      });
  });

  it('it should not create a trip if originId does not follow the correct format', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .set('token', token)
      .send(mockData.wrongOriginIdFormat)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should not create a trip if destinationId does not follow the correct format', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.wrongDestinationIdFormat)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should not create a trip if reason does not follow the correct format', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.wrongReasonIdFormat)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should not create a trip if tripTypeId does not follow the correct format', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.wrongTripTypeIdFormat)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should not create a trip if startDate does not follow the correct format', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.wrongStartDateFormat)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should not create a trip if returnDate does not follow the correct format', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.wrongReturnDateFormat)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should not create a trip if startDate is in the past', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.pastStartDate)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should not create a trip if tripTypeId does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.wrongTripTypeId)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should not create a trip if originId is missing', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.misisngOriginId)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should create a return trip', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(tripMockData.correctTrip)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should not create a trip if trip exists', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(tripMockData.correctTrip)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should not create a trip if token is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .set('token', tripMockData.wrongToken)
      .send(tripMockData.correctTrip)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should not create a trip if token is missing', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.correctTrip)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
  it('it should not create a trip if the return date is after the start date', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.earlyReturnDate)
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
});
