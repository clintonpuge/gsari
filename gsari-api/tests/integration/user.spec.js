
const request = require('supertest');
const bcrypt = require('bcrypt');
const { expect } = require('chai');
const {
  describe,
  before,
  after,
  afterEach,
  it,
} = require('mocha');
const { db, app } = require('../../app');
const { User } = require('../../models/user');

describe('/user/', () => {
  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.disconnect();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  const register = async (email, password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      await new User({ email, password: hash, name: 'hehehe' }).save();
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  describe('POST /login', () => {
    const exec = async (email, password) => request(app)
      .post('/user/login')
      .send({ email, password });

    it('should return 404 if email not found', async () => {
      const res = await exec('qwewqewqeq@m.com', 'tet1234');
      expect(res.status).to.equal(404);
    });

    it('should return 401 if invalid credentials', async () => {
      const email = 'hahah@mail.com';
      await register(email, 'test123');
      const res = await exec(email, '12345');
      expect(res.status).to.equal(401);
    });

    it('should return token if valid credentials', async () => {
      const email = 'test1@mail.com';
      const password = 'pass123456';
      await register(email, password);
      const res = await exec(email, password);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.own.property('token');
    });
  });

  describe('POST /register', () => {
    const exec = async (email, password, name) => request(app)
      .post('/user/register')
      .send({ email, password, name });

    it('should return 400 if email already exists', async () => {
      const email = 'anotheremail@test.com1';
      await register(email, 'test123', 'name123');
      const res = await exec(email, '1234', 'ew2qq');
      expect(res.status).to.equal(400);
    });

    it('should return the saved user', async () => {
      const res = await exec('anowqeq@test.com', '1234qwe', 'wewww');
      expect(res.body).to.have.own.property('id');
    });
  });
});
