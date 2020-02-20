
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import bookMockData from './mock/BookingsMockData';

chai.use(chaiHttp);
chai.should();
dotenv.config();
let userToken1, managerSignin;

describe('Book an accomadition facility', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(bookMockData.userSign)
      .end((err, res) => {
        userToken1 = res.body.data;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(bookMockData.managerSignin)
      .end((err, res) => {
        managerSignin = res.body.data;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/profile-settings')
      .set('token', userToken1)
      .send(bookMockData.userSetProfile)
      .end(() => {
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/trips/oneway')
      .set('token', userToken1)
      .send(bookMockData.makeTrip)
      .end(() => {
        done();
      });
  });
  it('should not be able to book an accomadition facility when checkInDate is greater than checkOutDate', (done) => {
    chai.request(app).post('/api/v1/bookings')
      .set('token', userToken1)
      .send(bookMockData.checkInDateGreaterThanCheckOutDate)
      .end((err, res) => {
        expect(res.body.message).eql('CheckOutDate should be greater than CheckInDate');
        res.should.have.status(400);
        res.body.should.be.an('object');
        done(err);
      });
  });
  it('should not be able to book an accomadition facility when checkInDate is Equal to checkOutDate', (done) => {
    chai.request(app).post('/api/v1/bookings')
      .set('token', userToken1)
      .send(bookMockData.checkInDateEqualsToCheckOutDate)
      .end((err, res) => {
        expect(res.body.message).eql('CheckInDate should not be same as CheckOutDate');
        res.should.have.status(400);
        res.body.should.be.an('object');
        done(err);
      });
  });
  it('should not be able to book an accomadition facility when no roomid provided', (done) => {
    chai.request(app).post('/api/v1/bookings')
      .set('token', userToken1)
      .send(bookMockData.noRoomIdProvided)
      .end((err, res) => {
        expect(res.body.message).eql(['roomId should be valid']);
        res.should.have.status(400);
        res.body.should.be.an('object');
        done(err);
      });
  });
  it('should be able to book an accomadition facility', (done) => {
    chai.request(app).post('/api/v1/bookings')
      .set('token', userToken1)
      .send(bookMockData.bookAccommodation)
      .end((err, res) => {
        expect(res.body.message).eql('You have booked an accommodation facility successfully');
        res.should.have.status(201);
        res.body.should.be.an('object');
        done(err);
      });
  });
  it('should not be able to book an accomadition facility when some one took it', (done) => {
    chai.request(app).post('/api/v1/bookings')
      .set('token', userToken1)
      .send(bookMockData.someTookAccommodation)
      .end((err, res) => {
        expect(res.body.message).eql('Room booked by other client');
        res.should.have.status(409);
        res.body.should.be.an('object');
        done(err);
      });
  });
});
describe('Get User Booking accomadition request', () => {
  it('should be able to get user booking request', (done) => {
    chai.request(app).get('/api/v1/bookings')
      .set('token', userToken1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        expect(res.body.message).eql('User booking requests are retrieved successfully');
        done(err);
      });
  });
  it('should be able to get a specific user booking request', (done) => {
    chai.request(app).get('/api/v1/bookings/1')
      .set('token', userToken1)
      .end((err, res) => {
        expect(res.body.message).eql('User booking requests are retrieved successfully');
        res.should.have.status(200);
        res.body.should.be.an('object');
        done(err);
      });
  });
  it('should not be able to get a specific user booking request when the request does not found', (done) => {
    chai.request(app).get('/api/v1/bookings/8000')
      .set('token', userToken1)
      .end((err, res) => {
        expect(res.body.message).eql('No Booking request found');
        res.should.have.status(404);
        res.body.should.be.an('object');
        done(err);
      });
  });
});
