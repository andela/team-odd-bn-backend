import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { describe, it } from 'mocha';
import app from '../index';

import {
  usersSignin,
  usersWrongInfo,
  usersAccountNotMatch,
  wrongEmail,
  users
} from './mock/mockData';

chai.use(chaiHttp);
chai.should();

dotenv.config();

const {
  ...data
} = users;

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
    } = users;
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
    } = users;
    chai.request(app).post('/api/v1/auth/signup').send(d).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should not be able to signup when empty email', (done) => {
    const {
      email,
      ...dat
    } = users;
    chai.request(app).post('/api/v1/auth/signup').send(dat).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should not be able to signup when empty password', (done) => {
    const {
      password,
      ...datas
    } = users;
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
      .send(usersSignin)
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
      .send(usersWrongInfo)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });


  it('Email or password do not match', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(usersAccountNotMatch)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });

  it('Email is wrong', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(wrongEmail)
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
