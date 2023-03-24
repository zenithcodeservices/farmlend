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



app.use(express.json());

// Import organizations router
const organizationsRouter = require('./routes/organizations');
app.use('/organizations', organizationsRouter);

// Import products router
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

// Import orders router
const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter);

module.exports = pool;
module.exports = app;