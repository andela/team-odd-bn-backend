
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import notificationMockData from './mock/notificationMockData';

const {
  userSign, unVerifiedusersSignin, notificationIds, inValidNotificationIds, nonArrayNotificationIds
} = notificationMockData;

chai.use(chaiHttp);
chai.should();
dotenv.config();
let userToken1, userToken2;
describe('Notification tests', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userSign)
      .end((err, res) => {
        userToken1 = res.body.data;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(unVerifiedusersSignin)
      .end((err, res) => {
        userToken2 = res.body.data;
        done();
      });
  });
  it('A user should be able to mark all notifications as read', (done) => {
    chai.request(app).patch('/api/v1/notifications/markRead/')
      .set('token', userToken1)
      .send(notificationIds)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.message).eql('Notification marked as read successfully');
        done(err);
      });
  });
  it('A user should not be able to mark all notifications as read when notificationID in the url is not an integer', (done) => {
    chai.request(app).patch('/api/v1/notifications/markRead/dfjhgds')
      .set('token', userToken1)
      .send(notificationIds)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).eql(['The notificationId should be an integer']);
        done(err);
      });
  });
  it('A user should not be able to mark all notifications as read when input is an array', (done) => {
    chai.request(app).patch('/api/v1/notifications/markRead/')
      .set('token', userToken1)
      .send(nonArrayNotificationIds)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).eql(['The notificationIds should be an array']);
        done(err);
      });
  });
  it('A user should not be able to mark all notifications as read when he/she has provided an invalid token', (done) => {
    chai.request(app).patch('/api/v1/notifications/markRead/')
      .set('token', 'jbdfjhbjsdb')
      .send(notificationIds)
      .end((err, res) => {
        expect(res.status).eql(401);
        expect(res.body.message).eql({ name: 'JsonWebTokenError', message: 'jwt malformed' });
        done(err);
      });
  });
  it('A user should not  be able to mark all notifications as read when he/she has not verified his/her email', (done) => {
    chai.request(app).patch('/api/v1/notifications/markRead/')
      .set('token', userToken2)
      .send(notificationIds)
      .end((err, res) => {
        expect(res.status).eql(401);
        expect(res.body.error).eql('Your email is not verified, please verify your email first');
        done(err);
      });
  });
  it('A user should not be able to mark all notifications as read when the notification IDs are not of type integer', (done) => {
    chai.request(app).patch('/api/v1/notifications/markRead/')
      .set('token', userToken1)
      .send(inValidNotificationIds)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.message).eql(['The notification IDs should be integer']);
        done(err);
      });
  });
  it('A user should be able to mark one notification as read', (done) => {
    chai.request(app).patch('/api/v1/notifications/markRead/11')
      .set('token', userToken1)
      .send(notificationIds)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.message).eql('Notification marked as read successfully');
        done(err);
      });
  });
});
