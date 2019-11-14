import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { describe, it } from 'mocha';
import AuthenticateToken from '../helpers/AuthenticateToken';
import app from '../index';
import mockData from './mock/mockData';

const user = mockData.veryfyEmailUser;

const token = AuthenticateToken.signToken(user);
chai.use(chaiHttp);
chai.should();

dotenv.config();

const {
  ...data
} = mockData.users;

describe('Authentication test', () => {
  it('should be able to signup', (done) => {
    chai.request(app).post('/api/v1/auth/signup').send(data).end((err, res) => {
      res.should.have.status(201);
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
    chai.request(app).post('/api/v1/auth/signup').send(data).end((err, res) => {
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
  it('Test verify email route', (done) => {
    chai.request(app).get(`/api/v1/auth/verify-email/1/${token}`).end((err, res) => {
      res.should.have.status(200);
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
  it('Test resend email route', (done) => {
    chai.request(app).get('/api/v1/auth/1/resend-email').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      done();
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
  it('Test resend email route with invalid id', (done) => {
    chai.request(app).get('/api/v1/auth/453/resend-email').end((err, res) => {
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
