use bamazon;

create table departments(
	department_id integer auto_increment not null,
    department_name varchar(45) not null,
    over_head_costs decimal(10,4) not null,
    primary key (department_id)
);