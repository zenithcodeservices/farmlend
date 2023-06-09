const express = require('express');
const PORT = process.env.PORT || 3000;
const { Pool } = require('pg');
require('dotenv').config()


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const app = express();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


app.use(express.json());

// Import organizations router
const organizationsRouter = require('./routes/organizations');
app.use('/organizations', organizationsRouter(pool));

// Import products router
const productsRouter = require('./routes/products');
app.use('/products', productsRouter(pool));

// Import orders router
const ordersRouter = require('./routes/orders');
app.use('/orders', ordersRouter(pool));


// Sample data for products
let products = [
  { id: 1, category: 'Apples', variety: 'Gala', packaging: '18KG Boxes' },
  { id: 2, category: 'Bananas', variety: 'Cavendish', packaging: '20kg mesh bags' },
  { id: 3, category: 'Kiwi', variety: 'Hayward', packaging: '18KG Boxes' }
];


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = app;