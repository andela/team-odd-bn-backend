import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import mockdata from './mock/mockdata';

chai.use(chaiHttp);
chai.should();

dotenv.config();

const {
  ...data
} = mockdata.users;

describe('Authentication test', () => {
  it('should be able to signup', (done) => {
    chai.request(app).post('/api/auth/signup').send(data).end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should be not able to signup when route path is incorrect', (done) => {
    chai.request(app).post('/api/auth/signupkfnddnf').end((err, res) => {
      res.should.have.status(404);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should not be able to signup when email already exist', (done) => {
    chai.request(app).post('/api/auth/signup').send(data).end((err, res) => {
      res.should.have.status(409);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should not be able to signup when empty firstName', (done) => {
    const {
      firstName,
      ...da
    } = mockdata;
    chai.request(app).post('/api/auth/signup').send(da).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should not be able to signup when empty lastName', (done) => {
    const {
      lastName,
      ...d
    } = mockdata;
    chai.request(app).post('/api/auth/signup').send(d).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should not be able to signup when empty email', (done) => {
    const {
      email,
      ...dat
    } = mockdata;
    chai.request(app).post('/api/auth/signup').send(dat).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an('object');
      done();
    });
  });
  it('should not be able to signup when empty password', (done) => {
    const {
      password,
      ...datas
    } = mockdata;
    chai.request(app).post('/api/auth/signup').send(datas).end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.an('object');
      done();
    });
  });
});
