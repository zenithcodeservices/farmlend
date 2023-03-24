INSERT INTO organizations (name, type) VALUES
('ABC Corp', 'Retail'),
('XYZ Inc', 'Wholesale'),
('EFG Ltd', 'Manufacturer');

INSERT INTO products (category, variety, packaging) VALUES
('Fruit', 'Apple', 'Box'),
('Vegetables', 'Carrot', 'Bag'),
('Canned Food', 'Tomato Sauce', 'Can'),
('Beverages', 'Orange Juice', 'Bottle');

INSERT INTO orders (type, referenced_order_id, referenced_product_id) VALUES
('New', NULL, 2),
('New', NULL, 1),
('Cancel', 1, NULL),
('Change', 2, 4),
('New', NULL, 3),
('Cancel', 3, NULL);

INSERT INTO order_products (order_id, product_id, volume, price_per_unit) VALUES
(1, 1, 50.00, 0.75),
(1, 2, 100.00, 0.50),
(2, 4, 75.00, 1.25),
(4, 1, 25.00, 0.75),
(4, 4, 50.00, 1.25),
(5, 3, 150.00, 2.00);

