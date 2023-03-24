const request = require('supertest');
const app = require('./server');

// Products tests
describe('Products API', () => {
    let productId;
    it('should create a new product', async () => {
      const res = await request(app)
        .post('/products')
        .send({ category: 'Test Category', variety: 'Test Variety', packaging: 'Test Packaging' });
      expect(res.statusCode).toEqual(201);
      expect(res.body.category).toEqual('Test Category');
      expect(res.body.variety).toEqual('Test Variety');
      expect(res.body.packaging).toEqual('Test Packaging');
      productId = res.body.id;
    });
  
    it('should get all products', async () => {
      const res = await request(app).get('/products');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  
    it('should update a product', async () => {
      const res = await request(app)
        .patch(`/products/${productId}`)
        .send({ category: 'Updated Category', variety: 'Updated Variety', packaging: 'Updated Packaging' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.category).toEqual('Updated Category');
      expect(res.body.variety).toEqual('Updated Variety');
      expect(res.body.packaging).toEqual('Updated Packaging');
    });
  
    it('should delete a product', async () => {
      const res = await request(app).delete(`/products/${productId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual('Product was deleted!');
    });
  });
  