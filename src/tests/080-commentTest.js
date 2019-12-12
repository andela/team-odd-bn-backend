import chai from 'chai';
import app from '../index';
import mockData from './mock/mockData';
import tripMockData from './mock/tripMockData';

const { expect } = chai;

let userToken, superToken, tripId, managerToken;
describe('User/manager should be able to post/get comments', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.isManager)
      .end((err, res) => {
        managerToken = res.body.data;
        done(err);
      });
  });
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
      .post('/api/v1/auth/signin')
      .send(mockData.newSuperAdminLogin)
      .end((err, res) => {
        superToken = res.body.data;
        done(err);
      });
  });
  before((done) => {
    chai.request(app)
      .put('/api/v1/users/profile-settings')
      .set('token', userToken)
      .send(mockData.unknownUserUpdate)
      .end((err) => {
        done(err);
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/trips/oneway')
      .set('token', userToken)
      .send(tripMockData.oneWaytrip)
      .end((err, res) => {
        tripId = res.body.data.id;
        done(err);
      });
  });

  it('It should post a comment successfully', (done) => {
    chai.request(app)
      .post('/api/v1/trips/1/comment')
      .set('token', managerToken)
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
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message[0]).eql('Comment should be of at least two characters');
        done(err);
      });
  });
  it('It should not post empty comment unless the commenter is requester/manager', (done) => {
    chai.request(app)
      .post('/api/v1/trips/1/comment')
      .set('token', superToken)
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
      .set('token', managerToken)
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
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.message).eql('All comments about this trip request have been retrieved successfuly!');
        done(err);
      });
  });
  it('It should get 0 comments of a specific trip', (done) => {
    chai.request(app)
      .get(`/api/v1/trips/${tripId}/comments`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.message).eql('No comments for this trip yet!');
        done(err);
      });
  });
  it('It should not get comment unless the commenter is requester/manager', (done) => {
    chai.request(app)
      .get(`/api/v1/trips/${tripId}/comments`)
      .set('token', superToken)
      .end((err, res) => {
        expect(res.status).eql(403);
        expect(res.body.message).eql('You should be either a requester or a manager');
        done(err);
      });
  });
  it('It should not get comment with invalid trip Id', (done) => {
    chai.request(app)
      .get('/api/v1/trips/d/comments')
      .set('token', managerToken)
      .send(mockData.userComment)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message[0]).eql('Trip Request Id shopuld be of integer type');
        done(err);
      });
  });
  it('Should not delete comment if token is invalid', (done) => {
    chai.request(app)
      .delete('/api/v1/trips/delete/1')
      .set('token', mockData.invalidToken)
      .send(mockData.userComment)
      .end((err, res) => {
        expect(res.status).eql(401);
        expect(res.body.message.message).eql('jwt malformed');
        done(err);
      });
  });

  it('Should not delete comment if comment id is not an integer', (done) => {
    chai.request(app)
      .delete('/api/v1/trips/delete/dffghj')
      .set('token', userToken)
      .send(mockData.userComment)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message[0]).eql('Comment Id should be an integer');
        done(err);
      });
  });

  it('Should not delete comment if user does not own the comment', (done) => {
    chai.request(app)
      .delete('/api/v1/trips/delete/1')
      .set('token', userToken)
      .send(mockData.userComment)
      .end((err, res) => {
        expect(res.status).eql(403);
        expect(res.body.message).eql('Ooops! You cannot delete this comment. You are not the owner');
        done(err);
      });
  });


  it('Should not delete comment if commentId does not exist', (done) => {
    chai.request(app)
      .delete('/api/v1/trips/delete/99999999')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).eql(404);
        expect(res.body.message).eql('Ooops! Comment does\'nt exist');
        done(err);
      });
  });

  it('Should delete comment successfully if the user owns the comment', (done) => {
    chai.request(app)
      .delete('/api/v1/trips/delete/1')
      .set('token', managerToken)
      .send(mockData.userComment)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.message).eql('Your comment has been deleted successfully');
        done(err);
      });
  });
});
