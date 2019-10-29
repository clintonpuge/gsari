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
const { Message } = require('../../models/message');
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
      const topic = new Topic({ description: 'before each desc', subject: 'before each subj' });
      await topic.save();
      id = topic._id;
      token = generateAuthToken(user);
    } catch (error) {
      console.log(error);
    }
  });

  afterEach(async () => {
    await Message.deleteMany({});
    await Topic.deleteMany({});
    await User.deleteMany({});
  });

  describe('GET /topic/:id/messages', () => {
    const exec = async () => request(app).get(`/topic/${id}/messages`).send({ token });
    it('should return a list of messages', async () => {
      const message = new Message({ message: 'test message1', topic_id: id });
      await message.save();
      const res = await exec();
      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.lengthOf(1);
    });
  });

  describe('POST /topic/:id/message', () => {
    const exec = async (message) => request(app)
      .post(`/topic/${id}/message`)
      .send({ message, token });

    it('should return 401 if invalid token', async () => {
      token = '';
      const res = await exec('test message');
      expect(res.status).to.equal(401);
    });

    it('should return the saved topic if successful', async () => {
      const res = await exec('test message 1234');
      expect(res.status).to.equal(201);
      expect(res.body).to.have.own.property('message');
    });
  });
});
