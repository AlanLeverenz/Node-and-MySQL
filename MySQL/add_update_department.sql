USE bamazon;

INSERT INTO departments (department_name)
VALUES ("Books");

UPDATE departments
SET over_head_costs = 3000
WHERE department_name = "Books"