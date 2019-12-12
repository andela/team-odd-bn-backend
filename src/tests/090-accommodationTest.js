import chai from 'chai';
import app from '../index';
import mockData from './mock/mockData';
import accommodationMockData from './mock/accommodationMockData';

const { expect } = chai;
const fakeToken = 'hhhhbjhvjhfgjfjfjfjfgjhvjjgjhjhjgjgj';
let TripAdminToken, superAdminToken, TripAdminSignupToken, unVerifiedTripAdminToken, userToken;
const {
  users,
  usersSignin,
  correctAccomodationData,
  wrongNameAccomodationData,
  wrongDescriptionAccomodationData,
  WrongImagesAccomodationData,
  wrongAddressAccomodationData,
  wrongGoogleCoordinatesAccomodationData,
  wrongRoomTypeAccomodationData,
  wrongRoomNameAccomodationData,
  emptyRoomAccomodationData,
  emptyImageUrlsAccomodationData,
  wrongCityIdAccomodationData,
  unVerifiedusersSignin,
  wrongImageUrlAccomodationData,
  wrongCoordinatesRangeAccomodationData
} = accommodationMockData;

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

describe('Trip Administartor should be able to create accomodation facilities', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.newSuperAdminLogin)
      .end((err, res) => {
        superAdminToken = res.body.data;
        done(err);
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(users)
      .end((err, res) => {
        TripAdminSignupToken = res.body.data;
        done(err);
      });
  });
  before((done) => {
    chai.request(app).get(`/api/v1/auth/verify-email/13/${TripAdminSignupToken}`).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      done();
    });
  });
  before((done) => {
    const email = 'travelAdmin@gmail.com';
    chai.request(app)
      .put('/api/v1/users/role/4')
      .set('token', superAdminToken)
      .send({ email })
      .end(() => {
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(usersSignin)
      .end((err, res) => {
        TripAdminToken = res.body.data;
        done(err);
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(unVerifiedusersSignin)
      .end((err, res) => {
        unVerifiedTripAdminToken = res.body.data;
        done(err);
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.user1)
      .end((err, res) => {
        userToken = res.body.data;
        done();
      });
  });
  it('It should post an a ccomodation facility if the Travel admin\'s email is not verified', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', unVerifiedTripAdminToken)
      .send(correctAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(401);
        expect(res.body.error).eql('Your email is not verified, please verify your email first');
        done(err);
      });
  });
  it('It should post an a ccomodation facility successfully', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(correctAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(201);
        expect(res.body.message).eql('Accommodation successfully posted');
        res.body.data.should.be.an('object');
        done(err);
      });
  });
  it('It should not post an a ccomodation facility twice', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(correctAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(409);
        expect(res.body.message).eql('The accommodation already exist.');
        done(err);
      });
  });
  it('It should not post accomodation with the wrong accomodation name', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(wrongNameAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql(['name should be a minimum of 2 letters']);
        done(err);
      });
  });
  it('It should not post accomodation with the wrong accomodation image urls', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(wrongImageUrlAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql('Invalid image url');
        done(err);
      });
  });
  it('It should not post accomodation with the wrong google cordinates', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(wrongGoogleCoordinatesAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql('invalid google maps coordinates');
        done(err);
      });
  });
  it('It should not post accomodation with the wrong google cordinates Range', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(wrongCoordinatesRangeAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql('invalid google maps coordinates');
        done(err);
      });
  });
  it('It should not post accomodation with the wrong accomodation address', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(wrongAddressAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql(['name should be a minimum of 2 letters']);
        done(err);
      });
  });
  it('It should not post accomodation with the wrong accomodation description', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(wrongDescriptionAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql(['description should be a minimum of 2 letters']);
        done(err);
      });
  });
  it('It should not post accomodation with the wrong accomodation cityId', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(wrongCityIdAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql(['cityId should be an integer']);
        done(err);
      });
  });
  it('It should not post accomodataion with the wrong token', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', fakeToken)
      .send(wrongDescriptionAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(401);
        expect(res.body.message).eql({ name: 'JsonWebTokenError', message: 'jwt malformed' });
        done(err);
      });
  });
  it('It should not post a ccomodataion with the wrong token', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', superAdminToken)
      .send(wrongDescriptionAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(403);
        expect(res.body.message).eql('you are not a travel administrator');
        done(err);
      });
  });
  it('Should not post accomodation with the wron image format', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(WrongImagesAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql('Invalid image url');
        done(err);
      });
  });
  it('Should not post accomodation with the wrong room name', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(wrongRoomNameAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql(['room name should be a minimum of 1 letters']);
        done(err);
      });
  });
  it('Should not post accomodation when no room is provided', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(emptyRoomAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql(['Rooms must be provided']);
        done(err);
      });
  });
  it('Should not post accomodation with the wrong room name', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(emptyImageUrlsAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql([
          'imageUrls must be provided',
          'roomType should be a minimum of 2 letters'
        ]);
        done(err);
      });
  });
  it('Should not post accomodation with the wrong room type', (done) => {
    chai.request(app)
      .post('/api/v1/accommodations/')
      .set('token', TripAdminToken)
      .send(wrongRoomTypeAccomodationData)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql(['roomType should be a minimum of 2 letters']);
        done(err);
      });
  });
});
