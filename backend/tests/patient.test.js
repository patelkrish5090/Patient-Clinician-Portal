const request = require('supertest');
const app = require('../server');

beforeAll(async () => {
    await connectDB();
  });
  
  afterAll(async () => {
    await disconnectDB();
  });

describe('Patient API', () => {
  let token;

  test('Register Patient', async () => {
    const res = await request(app)
      .post('/api/patient/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        dob: '1990-01-01',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('Login Patient', async () => {
    const res = await request(app)
      .post('/api/patient/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Submit Query', async () => {
    const res = await request(app)
      .post('/api/patient/query')
      .set('x-auth-token', token) // Include the token from the login response
      .send({
        question: 'What are the symptoms of diabetes?',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});