USE bamazon;

SELECT 
    D.department_id,
    D.department_name,
    D.over_head_costs,
    SUM(P.product_sales),
    SUM(P.product_sales) - D.over_head_costs AS total_profit
FROM
    departments D
        JOIN
    products P ON D.department_name = P.departmentname
GROUP BY D.department_id
ORDER BY D.department_id



