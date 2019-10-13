drop database bamazon;
create database bamazon;
use bamazon;
create table products(
	itemid integer auto_increment not null,
    productname varchar(45) not null,
    departmentname varchar(45) not null,
    price decimal(10,4) not null,
    stockquantity integer(10) not null,
    product_sales DECIMAL(10,4) not null,
    primary key (itemid)
);
create table departments(
	department_id integer auto_increment not null,
    department_name varchar(45) not null,
    over_head_costs decimal(10,4) not null,
    primary key (department_id)
);
