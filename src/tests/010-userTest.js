import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mockData from './mock/mockData';

chai.use(chaiHttp);
chai.should();

let token;


const { expect } = chai;

const {
  unknownUserUpdate, invalidManager, userInvalidImage
} = mockData;
let unverifiedUserToken, trueToken;


describe('Authentication test', () => {
  it('should be able to signup', (done) => {
    chai.request(app).post('/api/v1/auth/signup')
      .send(mockData.users).end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        token = res.body.data;
        done();
      });
  });
  it('Test verify email route', (done) => {
    chai.request(app).get(`/api/v1/auth/verify-email/8/${token}`).end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should be not able to signup when route path is incorrect', (done) => {
    chai.request(app).post('/api/v1/auth/signupkfnddnf').end((err, res) => {
      res.should.have.status(404);
      res.body.should.be.an('object');
      done();
    });
  });
  it('Test Welcome Page route', (done) => {
    chai.request(app).get('/').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should not be able to signup when email already exist', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send(mockData.users).end((err, res) => {
      res.should.have.status(409);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should not be able to signup when empty firstName', (done) => {
    const {
      firstName,
      ...da
    } = mockData.users;
    chai.request(app).post('/api/v1/auth/signup').send(da).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should not be able to signup when empty lastName', (done) => {
    const {
      lastName,
      ...d
    } = mockData.users;
    chai.request(app).post('/api/v1/auth/signup').send(d).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an('object');
      done();
    });
  });
  it('Test verify email route with invalid token', (done) => {
    chai.request(app).get('/api/v1/auth/verify-email/1/invalid-token').end((err, res) => {
      res.should.have.status(401);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should not be able to signup when empty email', (done) => {
    const {
      email,
      ...dat
    } = mockData.users;
    chai.request(app).post('/api/v1/auth/signup').send(dat).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an('object');
      done();
    });
  });
  it('Test resend email route succesful transaction', (done) => {
    chai.request(app).post('/api/v1/auth/resend-email').send(mockData.resendEmailData).end((err, res) => {
      res.should.have.status(200);
      expect(res.body.message).eql('An email has been sent to you.');
      done(err);
    });
  });
  it('Test resend email route with non-existent email', (done) => {
    chai.request(app).post('/api/v1/auth/resend-email').send({ email: 'iii@gmail.com' }).end((err, res) => {
      res.should.have.status(404);
      expect(res.body.message).eql('iii@gmail.com does not exist');
      done(err);
    });
  });
  it('Test resend email route with invalid email', (done) => {
    chai.request(app).post('/api/v1/auth/resend-email').send({ email: 'iiigmail.com' }).end((err, res) => {
      res.should.have.status(400);
      expect(res.body.message).eql(['email should be valid']);
      done(err);
    });
  });
  it('should not be able to signup when empty password', (done) => {
    const {
      password,
      ...datas
    } = mockData.users;
    chai.request(app).post('/api/v1/auth/signup').send(datas).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an('object');
      done();
    });
  });
});

describe('User should signin', () => {
  it('Signin successfuly', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.usersSignin)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('data');
        res.body.should.be.an('object');
        done();
      });
  });

  it('Email should be invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.usersWrongInfo)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });


  it('Email or password do not match', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.usersAccountNotMatch)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });

  it('Email is wrong', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.wrongEmail)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });

  it('invalid input', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });
});
describe('User profile page settings', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'jean@gmail.com', password: 'Simulation1$' })
      .end((err, res) => {
        trueToken = res.body.data;
        done(err);
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.usersUnverifiedSignup)
      .end((err, res) => {
        unverifiedUserToken = res.body.data;
        done(err);
      });
  });


  it('it should not update user profile with invalid filed', (done) => {
    chai.request(app)
      .put('/api/v1/users/profile-settings')
      .set('token', unverifiedUserToken)
      .send(userInvalidImage)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql('Invalid image url');
        done(err);
      });
  });
  it('it should not update profile of unverified user', (done) => {
    chai.request(app)
      .put('/api/v1/users/profile-settings')
      .set('token', unverifiedUserToken)
      .send(unknownUserUpdate)
      .end((err, res) => {
        expect(res.status).eql(401);
        expect(res.body.error).eql('Your email is not verified, please verify your email first');
        done(err);
      });
  });
  it('it should not update profile of unidentified user', (done) => {
    chai.request(app)
      .put('/api/v1/users/profile-settings')
      .set('token', token)
      .send(unknownUserUpdate)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.message).eql('Your profile updated successfully');
        done(err);
      });
  });
  it('it should not update user profile with unknown manager', (done) => {
    chai.request(app)
      .put('/api/v1/users/profile-settings')
      .set('token', trueToken)
      .send(invalidManager)
      .end((err, res) => {
        expect(res.status).eql(404);
        expect(res.body.message).eql('Unknown line manager');
        done(err);
      });
  });
  it('it should update user profile successfully', (done) => {
    chai.request(app)
      .put('/api/v1/users/profile-settings')
      .set('token', trueToken)
      .send(unknownUserUpdate)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql('Unable to update your profile');
        done(err);
      });
  });
  it('it should not update user profile without token', (done) => {
    chai.request(app)
      .put('/api/v1/users/profile-settings')
      .send(unknownUserUpdate)
      .end((err, res) => {
        expect(res.status).eql(401);
        expect(res.body.message).eql('Please, insert the token');
        done(err);
      });
  });
  it('it should not update user profile with invalid token', (done) => {
    chai.request(app)
      .put('/api/v1/users/profile-settings')
      .set('token', 'trueToken')
      .send(unknownUserUpdate)
      .end((err, res) => {
        expect(res.status).eql(401);
        done(err);
      });
  });
  it('it should display user profile', (done) => {
    chai.request(app)
      .get('/api/v1/users/view-profile')
      .set('token', trueToken)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body).to.be.an('object');
        done(err);
      });
  });
});
