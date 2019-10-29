
const request = require('supertest');
const { expect } = require('chai');
const {
  describe,
  before,
  after,
  afterEach,
  beforeEach,
  it,
} = require('mocha');
const { db, app } = require('../../app');
const { Topic } = require('../../models/topic');
const { generateAuthToken, User } = require('../../models/user');

describe('Topics', () => {
  let token;
  let id;

  before(async () => {
    await db.connect();
  });

  after(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    try {
      const randEmail = `${Math.random().toString(36).substr(2, 5)}@t.com`;
      const user = new User({ name: 'a', email: randEmail, password: 'test1234' });
      await user.save();
      const topic = new Topic({ description: 'before each desc', subject: 'before each subj', created_by: user.id });
      await topic.save();
      id = topic._id;
      token = generateAuthToken(user);
    } catch (error) {
      console.log(error);
    }
  });

  afterEach(async () => {
    await Topic.deleteMany({});
    await User.deleteMany({});
  });

  describe('GET /topics', () => {
    const exec = async () => request(app).get('/topics');
    it('should return a list of topics', async () => {
      try {
        const res = await exec();
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.lengthOf(1);
      } catch (error) {
        console.log('ERROR', error);
      }
    });
  });

  // describe('GET /topic/:id', () => {
  //   const exec = async () => request(app).get(`/topic/${id}`);
  //   it('should return 404 if invalid id', async () => {
  //     id = '32131ewq';
  //     const res = await exec();
  //     expect(res.status).to.equal(404);
  //   });

  //   it('should return 200 if valid id', async () => {
  //     const res = await exec();
  //     expect(res.status).to.equal(200);
  //   });
  // });

  describe('POST /topic', () => {
    const exec = async (description, subject) => request(app)
      .post('/topic')
      .send({ description, subject, token });

    it('should return 401 if invalid token', async () => {
      token = '';
      const res = await exec('test post desc', 'test post subj');
      expect(res.status).to.equal(401);
    });

    it('should return the saved topic if successful', async () => {
      const res = await exec('test post desc 1', 'test post subj 1');
      expect(res.status).to.equal(201);
      expect(res.body).to.have.own.property('description');
    });
  });

  describe('PATCH /:id', () => {
    const exec = async () => request(app).patch(`/topic/${id}`)
      .send({ description: 'update description', token });

    it('should return 401 no token', async () => {
      token = '';
      const res = await exec();
      expect(res.status).to.equal(401);
    });

    it('should return 404 if id is not found', async () => {
      id = 'weadsa2131';
      const res = await exec();
      expect(res.status).to.equal(404);
    });

    it('should modify the topic if successful', async () => {
      const res = await exec();
      const topic = await Topic.findById(res.body.id);
      expect(res.status).to.equal(200);
      expect(topic.description).to.equal('update description');
    });

    it('should return the modified topic', async () => {
      const res = await exec();
      expect(res.status).to.equal(200);
      expect(res.body.description).to.equal('update description');
    });
  });

  describe('DELETE /:id', () => {
    const exec = async () => request(app).delete(`/topic/${id}`).send({ token });

    it('should return 401 if user is not logged in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).to.equal(401);
    });

    it('should successfully delete the topic if valid id', async () => {
      const res = await exec();
      expect(res.status).to.equal(200);
    });

    it('should return the deleted topic', async () => {
      const res = await exec();
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
    });

    it('should return 404 if invalid id', async () => {
      id = 'qwewq12';
      const res = await exec();
      expect(res.status).to.equal(404);
    });
  });
});
