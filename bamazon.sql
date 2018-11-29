DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price INT NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("IPAD", "Apple", 200.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chair", "Sunjoy", 30.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pearl Earrings", "The Pearl Source", 100.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Purse", "Gucci", 1000.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "Nike", 170.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sandals", "Chacos", 150.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hammock", "Eno", 70.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jacket", "Patagonia", 160.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pants", "Madewell", 128.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Leggings", "Lululemon", 109.00, 100);

SELECT * FROM products; 