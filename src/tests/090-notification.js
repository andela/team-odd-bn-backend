import chai from 'chai';
import app from '../index';
import mockData from './mock/mockData';

const { expect } = chai;


let managerToken;
describe('Expect to display all notifications', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.isManager)
      .end((err, res) => {
        managerToken = res.body.data;
        done(err);
      });
  });

  it('It should retrieve all notification successfully', (done) => {
    chai.request(app)
      .get('/api/v1/users/notification')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res.status).eql(200);
        expect(res.body.message).eql('Available notification');
        expect(res.body).have.property('data');
        expect(res.body.data).to.be.an('array');
        done(err);
      });
  });
});
