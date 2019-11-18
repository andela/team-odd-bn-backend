import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { describe, it } from 'mocha';
import profile from './mock/googleProfile';
import UserController from '../controllers/UserController';
import app from '../index';
import mockData from './mock/mockData';


const chai = require('chai');

const { socialUser, socialToken } = mockData;

chai.use(chaiHttp);
chai.use(sinonChai);
const { expect } = chai;


describe('Oauthentication CallBack', () => {
  afterEach(() => {
    sinon.restore();
  });


  it('Should return status 200', async () => {
    const req = {
      user: {
        socialUser
      }
    };

    const res = { status() { }, json() { }, };
    sinon.stub(res, 'status').returnsThis();
    await UserController.OAuthgoogle(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });
  it('Should not signin with google a user with wrong token', (done) => {
    chai.request(app)
      .post('/api/v1/auth/google')
      .send(socialToken)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql('Authentication error');
        done(err);
      });
  });
  it('Should not signin with facebook a user with wrong token', (done) => {
    chai.request(app)
      .post('/api/v1/auth/facebook')
      .send(socialToken)
      .end((err, res) => {
        expect(res.status).eql(400);
        expect(res.body.message).eql('Authentication error');
        done(err);
      });
  });
  it('OAuthCallback should return User object', async (done) => {
    const accessToken = 'xx-xx-xx';
    const refreshToken = 'xx-xx-xx';
    const cb = sinon.spy();
    UserController.googleCallBack(accessToken, refreshToken, profile, cb);
    expect(cb.withArgs({
      socialUser
    }));
    done();
  });
});
