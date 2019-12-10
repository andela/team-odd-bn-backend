import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import mockData from './mock/mockData';

chai.use(chaiHttp);
chai.should();

dotenv.config();
let userToken;

describe('Search functionality tests', () => {
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
      .get('/api/v1/search')
      .set('token', userToken)
      .send(mockData.usersSignin)
      .end(() => {
        done();
      });
  });

  it('should not search anything if no search query key parameter has been provided', (done) => {
    chai.request(app)
      .get('/api/v1/search')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.message).eql('Please provide a search query key parameter');
        res.should.have.status(400);
        res.body.should.be.an('object');
        done(err);
      });
  });

  it('should not search anything if the search query key parameter provided is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/search?monkey')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.message).eql('You provided an invalid search query key(s) parameter.Your search key should be either originId, destinationId, startDate, returnDate, firstName, status, or tripType');
        res.should.have.status(400);
        res.body.should.be.an('object');
        done(err);
      });
  });

  it('should not search anything if no search query value parameter has not been provided', (done) => {
    chai.request(app)
      .get('/api/v1/search?startDate=')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.message).eql('Please provide a search value parameter');
        res.should.have.status(400);
        res.body.should.be.an('object');
        done(err);
      });
  });

  it('should return an error message if search for trips if the search query cannot be found has been provided', (done) => {
    chai.request(app)
      .get('/api/v1/search?firstName=Ivy')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.message).eql('Oooops! No trips matching this search query parameter were found!');
        res.should.have.status(404);
        res.body.should.be.an('object');
        done(err);
      });
  });

  it('should not return searched trips if search query information is valid but user is not the owner of trip requests', (done) => {
    chai.request(app)
      .get('/api/v1/search?status=rejected')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.message).eql('Oooops! No trips matching this search query parameter were found!');
        res.should.have.status(404);
        res.body.should.be.an('object');
        done(err);
      });
  });

  it('should return searched trips if search query information is valid and is owner of trips requests', (done) => {
    chai.request(app)
      .get('/api/v1/search?status=pending')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.message).eql('Successfully retrieved trip requests by that search query parameter');
        res.should.have.status(200);
        res.body.should.be.an('object');
        done(err);
      });
  });
});
