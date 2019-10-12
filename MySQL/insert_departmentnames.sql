USE bamazon;

INSERT INTO departments (department_name)
SELECT departmentname 
 FROM products
GROUP BY departmentname