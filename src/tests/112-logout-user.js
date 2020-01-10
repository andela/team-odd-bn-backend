import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import mockData from './mock/mockData';
import AuthenticateToken from '../helpers/AuthenticateToken';

chai.use(chaiHttp);
chai.should();

dotenv.config();

const { fekeData } = mockData;

const userToken = AuthenticateToken.signToken(fekeData);

describe('Logout user', () => {
  it('Should logout a user successfully', (done) => {
    chai.request(app)
      .patch('/api/v1/users/logout')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.have.property('message', 'Logout successfully');
        res.should.have.status(200);
        res.body.should.be.an('object');
        done(err);
      });
  });

  it('Should fail if the token used twice', (done) => {
    chai.request(app)
      .patch('/api/v1/users/logout')
      .set('token', userToken)
      .end((err, res) => {
        res.body.should.have.property('message', 'You have provided an invalid token');
        res.should.have.status(401);
        res.body.should.be.an('object');
        done(err);
      });
  });

  it('Should fail if forgot to add token', (done) => {
    chai.request(app)
      .patch('/api/v1/users/logout')
      .set('token', '')
      .end((err, res) => {
        res.body.should.have.property('message', 'Please, insert the token');
        res.should.have.status(401);
        res.body.should.be.an('object');
        done(err);
      });
  });
});
