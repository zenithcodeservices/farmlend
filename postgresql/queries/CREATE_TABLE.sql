CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(255)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category VARCHAR(255),
  variety VARCHAR(255),
  packaging VARCHAR(255)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  type VARCHAR(255),
  referenced_order_id INTEGER REFERENCES orders(id),
  referenced_product_id INTEGER REFERENCES products(id)
);

CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  volume DECIMAL(10,2),
  price_per_unit DECIMAL(10,2)
);
