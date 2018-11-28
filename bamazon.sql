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
VALUES ("mock", "mock", 1.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mock", "mock", 1.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mock", "mock", 1.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mock", "mock", 1.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mock", "mock", 1.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mock", "mock", 1.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mock", "mock", 1.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mock", "mock", 1.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mock", "mock", 1.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mock", "mock", 1.00, 100);

SELECT * FROM products; 
