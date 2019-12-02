import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import mockData from './mock/mockData';
import accommodationMockData from './mock/accommodationMockData';

const { expect } = chai;

chai.use(chaiHttp);
chai.should();

dotenv.config();

let userToken;

describe('Accomodation Ratings Tests', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.user1)
      .end((err, res) => {
        userToken = res.body.data;
        done();
      });
  });
  it('should be able to save a rating', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/ratings')
      .send(accommodationMockData.correctRating)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body.message).eql('You have successfully rated this accomodation');
        done();
      });
  });

  it('should not be able to save a rating if the rating provided doesn\'t follow the correct format', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/ratings')
      .send(accommodationMockData.wrongRating)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql(['rating should be a number ranging from 1 - 5']);
        done();
      });
  });

  it('should not be able to save a rating if the review provided doesn\'t follow the correct format', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/ratings')
      .send(accommodationMockData.wrongReview)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql(['Review should be a minimum of 2 letters']);
        done();
      });
  });

  it('should not be able to save a rating if accomodationId provided doesn\'t follow the correct format', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/ratings')
      .send(accommodationMockData.wrongAccommodationId)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql(['accommodationId should be an integer']);
        done();
      });
  });

  it('should be not be able to save a duplicate rating', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/ratings')
      .send(accommodationMockData.correctRating)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(409);
        expect(res.body.message).eql('Oops! you already submitted a rating');
        done();
      });
  });
});
