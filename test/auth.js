process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs-extra');
const assert = require('assert');

const server = require('../index');
const user = require('../models/user');

const { expect } = chai;

chai.use(chaiHttp);

describe('Auth', function authTests() {
  this.slow(300);
  beforeEach(async () => {
    fs.emptyDirSync('data');
    await user.create('shiraz', 'hello');
  });
  describe('POST /auth/signup', () => {
    it('should create user when it is not there', (done) => {
      chai
        .request(server)
        .post('/auth/signup')
        .send({ userName: 'mohak', password: 'hello' })
        .end((err, res) => {
          expect(res).to.be.json; // eslint-disable-line no-unused-expressions
          expect(res).to.have.status(200);
          assert(res.body.success, 'adding user is not successful');
          done();
        });
    });
    it('should return error when user is there', (done) => {
      chai
        .request(server)
        .post('/auth/signup')
        .send({ userName: 'shiraz', password: 'hello' })
        .end((err, res) => {
          expect(res).to.be.json; // eslint-disable-line no-unused-expressions
          expect(res).to.have.status(200);
          assert(!res.body.success, 'adding existing user is successful');
          done();
        });
    });
  });
  describe('POST /auth/login', () => {
    it('should return user when it is there', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .send({ userName: 'shiraz', password: 'hello' })
        .end((err, res) => {
          expect(res).to.be.json; // eslint-disable-line no-unused-expressions
          expect(res).to.have.status(200);
          assert(res.body.success, 'not logging in users with correct credentials');
          done();
        });
    });
    it('should return error when password is wrong', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .send({ userName: 'shiraz', password: 'helo' })
        .end((err, res) => {
          expect(res).to.be.json; // eslint-disable-line no-unused-expressions
          expect(res).to.have.status(200);
          assert(!res.body.success, 'showed password correct even though it is wrong');
          done();
        });
    });
    it('should return error when user is not there', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .send({ userName: 'mohak', password: 'hello' })
        .end((err, res) => {
          expect(res).to.be.json; // eslint-disable-line no-unused-expressions
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
