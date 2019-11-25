import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mockData from './mock/mockData';


chai.use(chaiHttp);
const { expect } = chai;
let token;

describe('Forgot password', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.usersSignin)
      .end((err, res) => {
        token = res.body.data;

        done();
      });
  });
  it('it should not send a reset password email if email does not follow the correct format', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot-password')
      .send(mockData.wrongEmailFormat)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('it should not reset password whose password does not follow the correct format', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot-password')
      .send(mockData.wrongPasswordFormat)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('it should not reset password whose password and confirm password do not match', (done) => {
    chai.request(app)
      .patch(`/api/v1/auth/reset-password/${token}`)
      .send(mockData.passwordDontMatch)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('it should reset password whose password and confirm password match', (done) => {
    chai.request(app)
      .patch(`/api/v1/auth/reset-password/${token}`)
      .send(mockData.passwordsMatch)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('it should reset password with empty password field', (done) => {
    chai.request(app)
      .patch(`/api/v1/auth/reset-password/${token}`)
      .send(mockData.anyEmptyPasswordField)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('it should send a reset password email to an existing user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot-password')
      .send(mockData.existingEmail)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('it should not send a reset password email to an non-existing user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot-password')
      .send(mockData.nonExistingUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('it should not send a reset password email if email field is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot-password')
      .send(mockData.emptyEmailField)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        done(err);
      });
  });

  it('it should return invalid token when user token is wrong', (done) => {
    chai.request(app)
      .patch('/api/v1/auth/reset-password/rdtfvygbhujnk')
      .send({
        password: 'Demo@123',
        confirmPassword: 'Demo@123'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done(err);
      });
  });
});
