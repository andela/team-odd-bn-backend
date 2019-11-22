import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../index';
import mockData, { superAdminToken } from './mock/mockData';


chai.use(chaiHttp);
chai.should();

dotenv.config();


describe('Super admin should be able to assign role', () => {
  it('Create new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.assignNewUser)
      .end((err, res) => {
        res.body.should.have.property('data');
        res.body.should.be.an('object');
        done();
      });
  });

  it('Super admin should assign account', (done) => {
    const { email } = mockData.assignNewUser;
    chai.request(app)
      .put('/api/v1/users/role/6')
      .set('token', superAdminToken)
      .send({ email })
      .end((err, res) => {
        res.body.should.have.property('data');
        res.body.should.be.an('object');
        done();
      });
  });

  it('Super admin forget token', (done) => {
    const { email } = mockData.assignNewUser;
    chai.request(app)
      .put('/api/v1/users/role/6')
      .send({ email })
      .end((err, res) => {
        res.body.should.have.property('message', 'Please, insert the token');
        done();
      });
  });

  it('Super admin can not change role', (done) => {
    const { email } = mockData.superAdmin;
    chai.request(app)
      .put('/api/v1/users/role/6')
      .set('token', superAdminToken)
      .send({ email })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message', 'you are not allowed to change your access');
        done();
      });
  });

  it('Super admin wrong email', (done) => {
    const { email } = mockData.wrongEmail;
    chai.request(app)
      .put('/api/v1/users/role/6')
      .set('token', superAdminToken)
      .send({ email })
      .end((err, res) => {
        res.body.should.have.property('message', 'Email does not exist');
        done();
      });
  });

  it('Super admin wrong role', (done) => {
    const { email } = mockData.assignNewUser;
    chai.request(app)
      .put('/api/v1/users/role/100')
      .set('token', superAdminToken)
      .send({ email })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('Super admin wrong role', (done) => {
    chai.request(app)
      .get('/api/v1/users/role')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('Display available users in DB', () => {
  it('User should see available users', (done) => {
    chai.request(app)
      .get('/api/v1/users/all')
      .set('token', superAdminToken)
      .end((err, res) => {
        res.body.should.have.property('data');
        res.body.should.be.an('object');
        done();
      });
  });
});
