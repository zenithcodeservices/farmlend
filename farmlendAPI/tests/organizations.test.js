const request = require('supertest');
const app = require('./server');

// Organizations tests
describe('Organizations API', () => {
    let orgId;
    it('should create a new organization', async () => {
      const res = await request(app)
        .post('/organizations')
        .send({ name: 'Test Org', type: 'Non-Profit' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual('Test Org');
      expect(res.body.type).toEqual('Non-Profit');
      orgId = res.body.id;
    });
  
    it('should get all organizations', async () => {
      const res = await request(app).get('/organizations');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  
    it('should get a single organization', async () => {
      const res = await request(app).get(`/organizations/${orgId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual('Test Org');
      expect(res.body.type).toEqual('Non-Profit');
    });
  
    it('should update an organization', async () => {
      const res = await request(app)
        .put(`/organizations/${orgId}`)
        .send({ name: 'Updated Org', type: 'For-Profit' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual('Updated Org');
      expect(res.body.type).toEqual('For-Profit');
    });
  
    it('should delete an organization', async () => {
      const res = await request(app).delete(`/organizations/${orgId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual('Organization was deleted!');
    });
  });