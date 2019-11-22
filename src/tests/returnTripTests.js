import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import AuthenticateToken from '../helpers/AuthenticateToken';
import mockData from './mock/tripMockData';


chai.use(chaiHttp);
const { expect } = chai;

const userToken = AuthenticateToken.signToken(mockData.aUser);

describe('Return Trip Route Tests', () => {
  it('it should create a new trip ', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.correctTrip)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('it should not create a trip if originId does not follow the correct format', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .set('token', userToken)
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
      .set('token', userToken)
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
      .set('token', userToken)
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
      .set('token', userToken)
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
      .set('token', userToken)
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
      .set('token', userToken)
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
      .set('token', userToken)
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
      .set('token', userToken)
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
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('it should not create a trip if trip exists', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.correctTrip)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('it should not create a trip if token is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/trips/twoWay')
      .send(mockData.correctTrip)
      .set('token', mockData.wrongToken)
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
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });
});
