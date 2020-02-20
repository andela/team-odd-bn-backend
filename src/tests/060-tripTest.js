import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import tripMockData from './mock/tripMockData';
import mockData from './mock/mockData';

chai.use(chaiHttp);
chai.should();

dotenv.config();
let token;
let unverifiedUserToken, managerToken, wrongManagerToken, userToken;

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
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.usersSignin)
      .end((err, res) => {
        token = res.body.data;
        done();
      });
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.isManager)
      .end((err, res) => {
        managerToken = res.body.data;
      });
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.wrongManager)
      .end((err, res) => {
        wrongManagerToken = res.body.data;
      });
  });
  it('should be able to login a manager', (done) => {
    chai.request(app).post('/api/v1/auth/signin').send(mockData.managersUser)
      .end((err, res) => {
        managerToken = res.body.data;
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should be able to login a user', (done) => {
    chai.request(app).post('/api/v1/auth/signin').send(mockData.userMakeTrip)
      .end((err, res) => {
        userToken = res.body.data;
        res.should.have.status(200);
        res.body.should.be.an('object');
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
  it('should be able to create second one way trip', (done) => {
    chai.request(app).post('/api/v1/trips/oneway').send(tripMockData.correctOneWayTrip)
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(201);
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
  it('should not be able to reject a trip request while request not belongs to manager', (done) => {
    chai.request(app).patch('/api/v1/trips/3?status=accept')
      .set('token', managerToken)
      .send(mockData.approveRequest)
      .end((err, res) => {
        expect(res.body.message).eql('this request does not belongs to this manager');
        res.should.have.status(403);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should be able to approve a trip request', (done) => {
    chai.request(app).patch('/api/v1/trips/2?status=accept')
      .set('token', managerToken)
      .send(mockData.approveRequest)
      .end((err, res) => {
        expect(res.body.message).eql('this request has successfully accepted...');
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to approve a trip request when it is already approved', (done) => {
    chai.request(app).patch('/api/v1/trips/2?status=accept')
      .set('token', managerToken)
      .send(mockData.approveRequest)
      .end((err, res) => {
        expect(res.body.message).eql('this request has already been approved');
        res.should.have.status(409);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should be able to reject a trip request', (done) => {
    chai.request(app).patch('/api/v1/trips/2?status=reject')
      .set('token', managerToken)
      .send(mockData.approveRequest)
      .end((err, res) => {
        expect(res.body.message).eql('this request has successfully rejected...');
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to reject a trip request when it is already rejected', (done) => {
    chai.request(app).patch('/api/v1/trips/2?status=reject')
      .set('token', managerToken)
      .send(mockData.approveRequest)
      .end((err, res) => {
        expect(res.body.message).eql('this request has already been rejected');
        res.should.have.status(409);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to reject a trip request while he is not a manager', (done) => {
    chai.request(app).patch('/api/v1/trips/3?status=reject')
      .set('token', userToken)
      .send(mockData.approveRequest)
      .end((err, res) => {
        expect(res.body.message).eql('this request does not belongs to this manager');
        res.should.have.status(403);
        res.body.should.be.an('object');
        done();
      });
  });
  it('should not be able to reject or accept a trip request while route is incorrect', (done) => {
    chai.request(app).patch('/api/v1/trips/3?status=rejecthhhh')
      .set('token', userToken)
      .send(mockData.approveRequest)
      .end((err, res) => {
        expect(res.body.message).eql(['status should be either reject or accept']);
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
});
describe('Get requests', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.usersSignin)
      .end((err, res) => {
        token = res.body.data;

        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.users2UnverifiedSignup)
      .end((err, res) => {
        unverifiedUserToken = res.body.data;
        done(err);
      });
  });
  it('A user should be able to get his/her trip requests', (done) => {
    chai.request(app).get('/api/v1/trips/')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.an('array');
        expect(res.body.message).eql('succesfully fetched all  user\'s requests');
        done();
      });
  });
  it('A user should be able to get a single trip', (done) => {
    chai.request(app).get('/api/v1/trips/1')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.message).eql('succesfully fetched one  trip');
        done();
      });
  });
  it('A user should receive 404 error when the trip id is not found in the database', (done) => {
    chai.request(app).get('/api/v1/trips/wseftgyhu')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).eql(['ID should be an integer']);
        done();
      });
  });
  it('A user should be not able to get his/her trip requests if not verified', (done) => {
    chai.request(app).get('/api/v1/trips/')
      .set('token', unverifiedUserToken)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.error).eql('Your email is not verified, please verify your email first');
        done();
      });
  });
  it('A user should not be able to get his/her trip requests whwn token is not provided', (done) => {
    chai.request(app).get('/api/v1/trips/')
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).eql('Please, insert the token');
        done();
      });
  });
});

describe('Users should be able to edit trips', () => {
  let tripRequestMulticityId, tripRequestOneWayId;

  before((done) => {
    chai.request(app)
      .post('/api/v1/trips/multicity')
      .set('token', token)
      .send(tripMockData.newMultiCityData)
      .end((err, res) => {
        tripRequestMulticityId = res.body.data;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/trips/oneway')
      .set('token', token)
      .send(tripMockData.newOneWayTrip)
      .end((err, res) => {
        tripRequestOneWayId = res.body.data;
        done();
      });
  });

  it('User should be able to re-send the same multitrip', (done) => {
    chai.request(app)
      .put(`/api/v1/trips/edit/${tripRequestMulticityId.id}`)
      .set('token', token)
      .send(tripMockData.multiCityData)
      .end((err, res) => {
        res.body.should.have.property('message', 'Trip edited successfuly');
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('User should edit multi city', (done) => {
    chai.request(app)
      .put(`/api/v1/trips/edit/${tripRequestMulticityId.id}`)
      .set('token', token)
      .send(tripMockData.newMultiCityData)
      .end((err, res) => {
        res.body.should.have.property('message', 'Trip edited successfuly');
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('User should edit one way', (done) => {
    chai.request(app)
      .put(`/api/v1/trips/edit/${tripRequestOneWayId.id}`)
      .set('token', token)
      .send(tripMockData.editNewOneWay)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        res.body.should.have.property('message', 'Trip edited successfuly');
        done();
      });
  });

  it('User should not edit and send the same city', (done) => {
    chai.request(app)
      .put(`/api/v1/trips/edit/${tripRequestMulticityId.id}`)
      .set('token', token)
      .send(tripMockData.multiCitySameCitiesData)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message', 'Orign should not be same as destination');
        done();
      });
  });


  it('Should not avail requests for approval if not a manager', (done) => {
    chai.request(app)
      .get('/api/v1/trips/requests')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Should not avail requests for empty trip requests', (done) => {
    chai.request(app)
      .get('/api/v1/trips/requests')
      .set('token', wrongManagerToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Should avail requests for approval if he/she reports that specific manager', (done) => {
    chai.request(app)
      .get('/api/v1/trips/requests')
      .set('token', managerToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
});

describe('User stats for trips in X timeframe', () => {
  it('should return all one-way trips made between 2019-10-01 and 2019-11-30', (done) => {
    chai.request(app)
      .get('/api/v1/trips/stats/1?from=2019-10-01&to=2030-11-30')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.message).eql('All one way trips made between 2019-10-01 and 2030-11-30 retrieved successfully!');
        expect(res.body.data.userTrips.length).eql(2);
        expect(res.body.data).to.be.an('Object');
        done(err);
      });
  });
  it('should return all two-way trips made between 2020-01-01 and 2020-12-31', (done) => {
    chai.request(app)
      .get('/api/v1/trips/stats/2?from=2020-01-01&to=2020-12-31')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.message).eql('All one way trips made between 2020-01-01 and 2020-12-31 retrieved successfully!');
        expect(res.body.data.userTrips.length).eql(1);
        expect(res.body.data).to.be.an('Object');
        done(err);
      });
  });
  it('should return all multi city trips made between 2020-01-01 and 2020-12-30', (done) => {
    chai.request(app)
      .get('/api/v1/trips/stats/2?from=2020-01-01&to=2020-12-30')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.message).eql('All one way trips made between 2020-01-01 and 2020-12-30 retrieved successfully!');
        expect(res.body.data.userTrips.length).eql(1);
        done(err);
      });
  });
  it('should not retieve data if manager has not provided user id', (done) => {
    chai.request(app)
      .get('/api/v1/trips/stats/2?from=2020-01-01&to=2020-12-30')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql('Please provide user id if you are a manager');
        done(err);
      });
  });
  it('manager should get trip stats for a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/trips/stats/2?from=2020-01-01&to=2020-12-30&user=1')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.message).eql('All one way trips made between 2020-01-01 and 2020-12-30 retrieved successfully!');
        done(err);
      });
  });
  it('should not retieve data if fromDate is less than toDate', (done) => {
    chai.request(app)
      .get('/api/v1/trips/stats/2?from=2020-01-01&to=2015-12-30')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql('Start date should be less that end date');
        done(err);
      });
  });
  it('should not retieve data if user id is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/trips/stats/2?from=2020-01-01&to=2025-12-30&user=b')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql(['user should be identified by id of integer type']);
        done(err);
      });
  });
});
describe('User or Manager get info on most traveled destination', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.usersSignin)
      .end((err, res) => {
        userToken = res.body.data;
        done(err);
      });
  });

  it('should be able to get info on the most traveled destination', (done) => {
    chai.request(app).get('/api/v1/trips/most-traveled')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.message).eql('Most traveled destination info retrieved successfully');
        res.should.have.status(200);
        res.body.should.be.an('object');
        done(err);
      });
  });

  it('should not provide any trip types if token is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/trips/tripTypes')
      .set('token', mockData.invalidToken)
      .end((err, res) => {
        expect(res.body.message.message).eql('jwt malformed');
        res.should.have.status(401);
        res.body.should.be.an('object');
        done(err);
      });
  });

  it('should get all trip types', (done) => {
    chai.request(app)
      .get('/api/v1/trips/tripTypes')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.message).eql('Sucessfully retrieved all the trip types');
        res.should.have.status(200);
        res.body.should.be.an('object');
        done(err);
      });
    describe('Get all cities types functionality tests', () => {
      before((done) => {
        chai.request(app)
          .post('/api/v1/auth/signin')
          .send(mockData.testUser)
          .end((err, res) => {
            userToken = res.body.data;
            done(err);
          });
      });

      before((done) => {
        chai.request(app)
          .get('/api/v1/trips/all-cities')
          .set('token', userToken)
          .send(mockData.usersSignin)
          .end(() => {
            done();
          });
      });
      it('should not provide the cities if token is invalid', (done) => {
        chai.request(app)
          .get('/api/v1/trips/all-cities')
          .set('token', mockData.invalidToken)
          .end((err, res) => {
            expect(res.body.message.message).eql('jwt malformed');
            res.should.have.status(401);
            res.body.should.be.an('object');
            done(err);
          });
      });

      it('should get all cities', (done) => {
        chai.request(app)
          .get('/api/v1/trips/all-cities')
          .set('token', userToken)
          .end((err, res) => {
            expect(res.body.message).eql('Successfully retrieved all cities');
            res.should.have.status(200);
            res.body.should.be.an('object');
            done(err);
          });
      });
    });
  });
});
