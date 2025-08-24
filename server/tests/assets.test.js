import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import Asset from '../src/models/Asset';

beforeAll(async () => {
  const uri = process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/labassets_test';
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
    await Asset.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

test('POST/GET asset', async () => {
    const create = await request(app).post('/api/assets').send({ name: 'Scope'});
    expect(create.status).toBe(201);
    const list = await request(app).get('/api/assets');
    expect(list.status).toBe(200);
    expect(list.body.items.length).toBe(1);
});