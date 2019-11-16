import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import tripMockData from './mock/tripMockData';
import mockData from './mock/mockData';


chai.use(chaiHttp);
chai.should();

dotenv.config();

let token;


describe('Request One way trip test', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.usersSignin)
      .end((err, res) => {
        token = res.body.data;

        done();
      });
  });
  it('should be able to create one way trip', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(tripMockData.correctOneWayTrip)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to create one way trip whose dates fall in same range', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(tripMockData.correctOneWayTripDateRange)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to create one way trip twice', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(tripMockData.correctOneWayTrip)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should  not be able to create one way trip with wrong date', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(tripMockData.wrongDatesOneWayTrip)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to create one way trip whose origin and destination are similar', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(tripMockData.similarOriginDestinationOneWayTrip)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to create one way trip with invalid inputs', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(tripMockData.wrongOneWayTrip)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to create one way trip with non existent locations', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(tripMockData.nonLocationsOneWayTrip)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should be able to post multicity trip request', (done) => {
    chai.request(app).post('/api/v1/trips/multicity')
      .set('token', token)
      .send(tripMockData.multiCityData)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to create one way trip when no token inserted', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(tripMockData.oneWaytrip)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('One user should not request a trip twice', (done) => {
    chai.request(app).post('/api/v1/trips/multicity')
      .set('token', token)
      .send(tripMockData.multiCityData)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to post multicity trip request with non-existent locations', (done) => {
    chai.request(app).post('/api/v1/trips/multicity')
      .set('token', token)
      .send(tripMockData.nonMultiCityData)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to post multicity trip request with same origin and destination', (done) => {
    chai.request(app).post('/api/v1/trips/multicity')
      .set('token', token)
      .send(tripMockData.multiCitySameCitiesData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to post multicity trip request with samilar data', (done) => {
    chai.request(app).post('/api/v1/trips/multicity')
      .set('token', token)
      .send(tripMockData.multiCitySimilarData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to post multicity trip request with invalid date locations', (done) => {
    chai.request(app).post('/api/v1/trips/multicity')
      .set('token', token)
      .send(tripMockData.inValidMultiCityDateData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to post multicity trip request with invalid date locations', (done) => {
    chai.request(app).post('/api/v1/trips/multicity')
      .set('token', token)
      .send(tripMockData.inValidMultiCityDate2Data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  
  it('should not be able to post multicity trip request with invalid Date format', (done) => {
    chai.request(app).post('/api/v1/trips/multicity')
      .set('token', token)
      .send(tripMockData.inValidMultiCityDateFormatData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to post multicity trip request with invalid reason locations', (done) => {
    chai.request(app).post('/api/v1/trips/multicity')
      .set('token', token)
      .send(tripMockData.inValidMultiCityReasonData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to approve a trip request', (done) => {
    chai.request(app).patch('/api/v1/trips/1/approval')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to create one way trip when invalid token', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(tripMockData.oneWaytrip)
      .set('token', tripMockData.invalidToken)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should not be able to approve a trip request', (done) => {
    chai.request(app).patch('/api/v1/trips/100/approval')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
});
