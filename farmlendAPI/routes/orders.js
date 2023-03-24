const express = require('express');

function ordersRouter(pool)
{
  const router = express.Router();

  // Create a new order
  router.post('/orders', async (req, res) => {
    try {
      const { type, referenced_order_id, referenced_product_id } = req.body;
      const neworder = await pool.query(
        'INSERT INTO orders (type, referenced_order_id, referenced_product_id) VALUES ($1, $2, $3) RETURNING *',
        [type, referenced_order_id, referenced_product_id]
      );
      res.json(neworder.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  // Get all orders
  router.get('/orders', async (req, res) => {
    try {
      const allorders = await pool.query('SELECT * FROM orders');
      res.json(allorders.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  // Get a single order by id
  router.get('/orders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const order = await pool.query(
        'SELECT * FROM orders WHERE id = $1',
        [id]
      );
      res.json(order.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  // Update an order
  router.put('/orders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { type, referenced_order_id, referenced_product_id } = req.body;
      const updateorder = await pool.query(
        'UPDATE orders SET type = $1, referenced_order_id = $2, referenced_product_id = $3 WHERE id = $4 RETURNING *',
        [type, referenced_order_id, referenced_product_id, id]
      );
      res.json(updateorder.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  // Delete an order
  router.delete('/orders/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deleteorder = await pool.query(
        'DELETE FROM orders WHERE id = $1',
        [id]
      );
      res.json('order was deleted!');
    } catch (err) {
      console.error(err.message);
    }
  });

  return router;

}

module.exports = ordersRouter;
