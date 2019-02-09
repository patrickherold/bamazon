DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Coat", "Clothing", 22.50, 100);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Hat", "Clothing", 12.50, 100);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Shoes", "Clothing", 25, 100);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Gloves", "Clothing", 10.50, 100);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Scard", "Clothing", 8.95, 100);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Tires", "Automotive", 122.50, 100);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Oil", "Automotive", 7.50, 100);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Anti-Freeze", "Automotive", 9.0, 100);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Air Freshener", "Automotive", 95.00, 100);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Armor All", "Automotive", 2.50, 100);
