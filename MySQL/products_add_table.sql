use bamazon;

ALTER TABLE products
ADD COLUMN product_sales DECIMAL(10,4) not null;