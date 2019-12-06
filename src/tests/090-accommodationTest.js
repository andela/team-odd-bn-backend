import chai from 'chai';
import app from '../index';
import mockData from './mock/mockData';
import accommodationMockData from './mock/accommodationMockData';

const { expect } = chai;
let userToken;
describe('User likes/dislikes on accommodation facility', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.isManager)
      .end((err, res) => {
        userToken = res.body.data;
        done(err);
      });
  });
  it('should like a specific accommodation successfully', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/1?like=true')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body.message).eql('You liked this accommodation!');
        done(err);
      });
  });
  it('should unlike a specific accommodation successfully', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/1?like=true')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body.message).eql('You unliked this accommodation!');
        done(err);
      });
  });
  it('should dislike a specific accommodation successfully', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/1?like=false')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body.message).eql('You disliked this accommodation!');
        done(err);
      });
  });
  it('should un-dislike a specific accommodation successfully', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/1?like=false')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body.message).eql('You un-disliked this accommodation!');
        done(err);
      });
  });
  it('should not like/dislike a specific accommodation with invalid id', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/5y?like=false')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message[0]).eql('Accommodation id should be an integer');
        done(err);
      });
  });
  it('should not like/dislike a specific accommodation id which doesn\'t exist', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/0?like=false')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(404);
        expect(res.body.message).eql('The accommodation doesn\'t exist');
        done(err);
      });
  });
  it('should not like/dislike a specific accommodation with invalid like param', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/1?like=yes')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message[0]).eql('like param should be either true or false');
        done(err);
      });
  });
  it('should get all likes and dislikes of a specific accommodation successfully', (done) => {
    chai.request(app)
      .get('/api/v1/accommodations/1/likes')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.message).eql('All likes and dislikes of this accommodation have been retrieved successfully');
        done(err);
      });
  });
});
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
