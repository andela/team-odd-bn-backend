import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../index';
import mockData from './mock/mockData';

chai.use(chaiHttp);
chai.should();

dotenv.config();
let userToken;

describe('Get all Status types functionality tests', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.testUser)
      .end((err, res) => {
        userToken = res.body.data;

        done(err);
      });
  });

  before((done) => {
    chai.request(app)
      .get('/api/v1/status')
      .set('token', userToken)
      .send(mockData.usersSignin)
      .end(() => {
        done();
      });
  });

  it('should not provide any status if token is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/status')
      .set('token', mockData.invalidToken)
      .end((err, res) => {
        expect(res.body.message.message).eql('jwt malformed');
        res.should.have.status(401);
        res.body.should.be.an('object');
        done(err);
      });
  });

  it('should get all status', (done) => {
    chai.request(app)
      .get('/api/v1/status')
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.message).eql('Successfully retrieved all status types');
        res.should.have.status(200);
        res.body.should.be.an('object');
        done(err);
      });
  });
});
