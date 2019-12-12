import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import bookMockData from './mock/BookingsMockData';


chai.use(chaiHttp);
chai.should();

dotenv.config();
let userToken1;

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
    chai.request(app).post(`/api/v1/trips/${3}/booking`)
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
    chai.request(app).post(`/api/v1/trips/${3}/booking`)
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
    chai.request(app).post(`/api/v1/trips/${3}/booking`)
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
    chai.request(app).post(`/api/v1/trips/${3}/booking`)
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
    chai.request(app).post(`/api/v1/trips/${3}/booking`)
      .set('token', userToken1)
      .send(bookMockData.bookedAccommodation)
      .end((err, res) => {
        expect(res.body.message).eql('The accommodation has already booked');
        res.should.have.status(409);
        res.body.should.be.an('object');
        done(err);
      });
  });
  it('should not be able to book an accomadition facility when already requested', (done) => {
    chai.request(app).post(`/api/v1/trips/${3}/booking`)
      .set('token', userToken1)
      .send(bookMockData.bookAccommodation)
      .end((err, res) => {
        expect(res.body.message).eql('The accommodation has already booked');
        res.should.have.status(409);
        res.body.should.be.an('object');
        done(err);
      });
  });
  it('should be able to book an accomadition facility', (done) => {
    chai.request(app).post(`/api/v1/trips/${900}/booking`)
      .set('token', userToken1)
      .send(bookMockData.bookAccommodation)
      .end((err, res) => {
        expect(res.body.message).eql('The trip id not found');
        res.should.have.status(404);
        res.body.should.be.an('object');
        done(err);
      });
  });
});
