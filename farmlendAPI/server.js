const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'P9Amlverb',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;


app.use(express.json());


// Create a new organization
app.post('/organizations', async (req, res) => {
  try {
    const { name, type } = req.body;
    const newOrganization = await pool.query(
      'INSERT INTO organizations (name, type) VALUES ($1, $2) RETURNING *',
      [name, type]
    );
    res.json(newOrganization.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all organizations
app.get('/organizations', async (req, res) => {
  try {
    const allOrganizations = await pool.query('SELECT * FROM organizations');
    res.json(allOrganizations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a single organization by id
app.get('/organizations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await pool.query(
      'SELECT * FROM organizations WHERE id = $1',
      [id]
    );
    res.json(organization.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update an organization
app.put('/organizations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    const updateOrganization = await pool.query(
      'UPDATE organizations SET name = $1, type = $2 WHERE id = $3 RETURNING *',
      [name, type, id]
    );
    res.json(updateOrganization.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete an organization
app.delete('/organizations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteOrganization = await pool.query(
      'DELETE FROM organizations WHERE id = $1',
      [id]
    );
    res.json('Organization was deleted!');
  } catch (err) {
    console.error(err.message);
  }
});

// Sample data for products
let products = [
  { id: 1, category: 'Apples', variety: 'Gala', packaging: '18KG Boxes' },
  { id: 2, category: 'Bananas', variety: 'Cavendish', packaging: '20kg mesh bags' },
  { id: 3, category: 'Kiwi', variety: 'Hayward', packaging: '18KG Boxes' }
];

// Create product
app.post('/products', async (req, res) => {
  const { category, variety, packaging } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (category, variety, packaging) VALUES ($1, $2, $3) RETURNING *',
      [category, variety, packaging]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read products
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.send(result.rows);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update product
app.patch('/products/:id', async (req, res) => {
  const { category, variety, packaging } = req.body;
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE products SET category=$1, variety=$2, packaging=$3 WHERE id=$4 RETURNING *',
      [category, variety, packaging, id]
    );
    res.send(result.rows[0]);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE id=$1',
      [id]
    );
    res.json('Organization was deleted!');
  } catch (err) {
    console.error(err.message);
  }
});




/* // GET all products
app.get('/products', async (req, res) => {
  //res.json(products);
    const { rows } = await pool.query('SELECT * FROM products');
    res.json(rows);

});

// GET a single product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.sendStatus(404);
  }
});

// CREATE a new product
app.post('/products', (req, res) => {
  const product = req.body;
  product.id = products.length + 1;
  products.push(product);
  res.status(201).json(product);
});

// UPDATE an existing product by ID
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedProduct = req.body;
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { id, ...updatedProduct };
    res.json(products[index]);
  } else {
    res.sendStatus(404);
  }
});

// DELETE a product by ID
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}); */

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
