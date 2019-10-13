# Node-and-MySQL
A MySQL database driven by a Node.js app. 

## What the app does

This app is a simple non-ecommerce purchasing solution serving customer, manager, and supervisor roles. 
__Customers__ can select from among products to purchase and set the quantity they wish to buy. 
__Managers__ can view products on sale, check for low inventories, add to the inventory, and add new products for sale. 
__Supervisors__ can check total profits for each department and add new departments. 

## MySQL database

Here is the schema for the MySQL database supporting the app:
````
* bamazon
    * Tables
      * departments
        * department_id
        * department_name
        * over_head_costs
      * products
        * itemid
        * productname
        * departmentname
        * price
        * stockquantity
        * product_sales
 ````
  
#### MySQL schema screenshots

Bamazon Tables:
https://github.com/alanleverenz/Node-and-MySQL/blob/master/images/bamazon_tables.PNG

Products columns:
https://github.com/alanleverenz/Node-and-MySQL/blob/master/images/products_columns.PNG

Departments columns:
https://github.com/alanleverenz/Node-and-MySQL/blob/master/images/departments_columns.PNG


## How to run the app

Follow these instructions for running the app:

1. Fork the repository from this link: https//github.com/AlanLeverenz/Node-and-MySQL.
2. Open Terminal and navigate to your Node-and-MySQL folder.
3. Import the following CSV files into MySQL to setup the database. These files are located in the __docs__ folder.
   1. bamazon_products_data.CSV
   2. bamazon_departments_data.CSV
4. Run `npm i` to install required modules (mysql, inquirer, console.table)
5. Use this CLI to run the app as a *customer:*
    `$ node bamazonCustomer`
6. Use this CLI to run the app as a *manager:*
    `$ node bamazonManager`
7. Use this CLI to run the app as a *supervisor:*
   `$ node bamazonSupervisor`
8. Each user type is re-prompted until they select the Quit option.

## User options

#### Customer purchase

The customer is presented with a table of products to select from. They are prompted to enter the ID of the product they wish to buy, and how many.
https://github.com/alanleverenz/Node-and-MySQL/blob/master/images/customer_purchase_with_table.PNG

#### Manager options

The manager is presented with five options:
https://github.com/alanleverenz/Node-and-MySQL/blob/master/images/manager_select_task.PNG

#### Supervisor options

The supervisor is presented with three options:
https://github.com/alanleverenz/Node-and-MySQL/blob/master/images/supervisor_select_task.PNG

The supervisor can view profits calculated against overhead and purchases with query that joins both the *products* and *departments*.
https://github.com/alanleverenz/Node-and-MySQL/blob/master/images/supervisor_view_product_sales.PNG

## Technologies
Here are this app's NPM modules, databases, functions, and sample console/writeFile output:

#### NPM Modules
* inquirer
* mysql
* console.table

__console.table__ is an NPM module that displays array objects in a table format on the command line:

https://github.com/alanleverenz/Node-and-MySQL/blob/master/images/view_product_list.PNG

*Columns constructor*
````
var tableCols = function(department_id, department_name, over_head_costs, product_sales, total_profit) {
  this.department_id = department_id;
  this.department_name = department_name;
  this.over_head_costs = over_head_costs;
  this.product_sales = product_sales;
  this.total_profit = total_profit
}
````
(run SELECT query on MySQL database...)

*build and display table array*
````
for(var i=0; i<res.length; i++) 
  {
    tableArr.push(new tableCols(res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit));
  }
console.table(tableArr);
````
#### Author
Alan Leverenz