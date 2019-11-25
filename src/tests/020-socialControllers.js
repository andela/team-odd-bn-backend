import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import profile from './mock/googleProfile';
import UserController from '../controllers/UserController';
import socialUser from './mock/mockData';


const chai = require('chai');

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
