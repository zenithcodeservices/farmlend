const express = require('express');
const router = express.Router();
const pool = require('../server');

function productsRouter(pool) {

  const router = express.Router();

  // Create product
  router.post('/', async (req, res) => {
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
  router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM products');
      res.send(result.rows);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // Read product by ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM products WHERE id=$1', [id]);
      res.send(result.rows);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  // Update product
  router.patch('/:id', async (req, res) => {
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
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM products WHERE id=$1',
        [id]
      );
      res.json('Product was deleted!');
    } catch (err) {
      console.error(err.message);
    }
  });

  return router;

}

module.exports = productsRouter;
