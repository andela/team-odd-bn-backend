import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe('Error handling tests', () => {
  it('Display a 405 error when the wrong url is provided', (done) => {
    chai.request(app).post('/api/v1/auth/signupkfnddnf').end((err, res) => {
      res.should.have.status(404);
      expect(res.body.message).eql('Not Found');
      done();
    });
  });
});
