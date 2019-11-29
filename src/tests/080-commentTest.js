import chai from 'chai';
import app from '../index';
import mockData from './mock/mockData';
import tripMockData from './mock/tripMockData';

const { expect } = chai;

let trueToken, userToken, superToken, tripId;
describe('User/manager should be able to post/get comments', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.user2)
      .end((err, res) => {
        trueToken = res.body.data;
        done(err);
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.newSuperAdminLogin)
      .end((err, res) => {
        superToken = res.body.data;
        done(err);
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/trips/oneway')
      .set('token', superToken)
      .send(tripMockData.oneWaytrip)
      .end((err, res) => {
        tripId = res.body.data.id;
        done(err);
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.user1)
      .end((err, res) => {
        userToken = res.body.data;
        done(err);
      });
  });
  it('It should post a comment successfully', (done) => {
    chai.request(app)
      .post('/api/v1/trips/1/comment')
      .set('token', trueToken)
      .send(mockData.userComment)
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body.message).eql('Your comment was posted successfully');
        expect(res.body.data).eql(mockData.userComment.comment);
        done(err);
      });
  });
  it('It should not post empty comment', (done) => {
    chai.request(app)
      .post('/api/v1/trips/1/comment')
      .set('token', trueToken)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message[0]).eql('Comment should be of at least two characters');
        done(err);
      });
  });
  it('It should not post empty comment unless the commenter is requester/manager', (done) => {
    chai.request(app)
      .post('/api/v1/trips/1/comment')
      .set('token', userToken)
      .send(mockData.userComment)
      .end((err, res) => {
        expect(res.status).eql(403);
        expect(res.body.message).eql('You should be either a requester or a manager');
        done(err);
      });
  });
  it('It should not post comment with invalid trip Id', (done) => {
    chai.request(app)
      .post('/api/v1/trips/d/comment')
      .set('token', trueToken)
      .send(mockData.userComment)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message[0]).eql('Trip Request Id shopuld be of integer');
        done(err);
      });
  });
  it('It should get comments of a specific trip successfully', (done) => {
    chai.request(app)
      .get('/api/v1/trips/1/comments')
      .set('token', trueToken)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.message).eql('All comments about this trip request have been retrieved successfuly!');
        done(err);
      });
  });
  it('It should get 0 comments of a specific trip', (done) => {
    chai.request(app)
      .get(`/api/v1/trips/${tripId}/comments`)
      .set('token', superToken)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.message).eql('No comments for this trip yet!');
        done(err);
      });
  });
  it('It should not get comment unless the commenter is requester/manager', (done) => {
    chai.request(app)
      .get(`/api/v1/trips/${tripId}/comments`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(403);
        expect(res.body.message).eql('You should be either a requester or a manager');
        done(err);
      });
  });
  it('It should not get comment with invalid trip Id', (done) => {
    chai.request(app)
      .get('/api/v1/trips/d/comments')
      .set('token', trueToken)
      .send(mockData.userComment)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message[0]).eql('Trip Request Id shopuld be of integer type');
        done(err);
      });
  });
});
