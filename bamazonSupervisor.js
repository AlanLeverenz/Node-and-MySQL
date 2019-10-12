var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');
require('cli-table');

// var customer = require('./bamazonCustomer.js');

// make mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootAWL69",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    // console.log("connection successful!");
});

// prompt : select manager task
var selectSupervisorTask = function() {
    inquirer.prompt([{
        name: 'task',
        type: 'list',
        message: 'Select a supervisor task.',
        choices: [ "View Products Sales by Department", "Create New Department","Quit" ]
    }]).then(function(answers){

        switch (answers.task) {
            case 'View Products Sales by Department':
                ViewDepartmentSales();
                break;
            case 'Create New Department':
                AddNewDepartment();
                break;
            case 'Quit':
                process.exit();
        } // end switch
    }); // end answers function
}; // end function

// show list of departments
var showDepartments = function(){
    connection.query("SELECT department_name FROM departments", function(err,res){
        for(var i=0; i<res.length; i++){
            console.log(res[i].department_name );
        }
        selectSupervisorTask();
    });
}; // end showDepartments

// View Department Sales
var ViewDepartmentSales = function() {

    var tableArr = [];
    // constructor - console.table alternative solution
    var tableCols = function(department_id, department_name, over_head_costs, product_sales, total_profit) {
        this.department_id = department_id;
        this.department_name = department_name;
        this.over_head_costs = over_head_costs;
        this.product_sales = product_sales;
        this.total_profit = total_profit
    } // end constructor
    // connection query
    connection.query("SELECT D.department_id AS department_id, D.department_name AS department_name, D.over_head_costs AS over_head_costs, SUM(P.product_sales) AS product_sales, SUM(P.product_sales) - D.over_head_costs AS total_profit FROM departments D JOIN products P ON D.department_name = P.departmentname GROUP BY D.department_id ORDER BY D.department_id", function(err,res) {
        for(var i=0; i<res.length; i++) 
        {
            tableArr.push(new tableCols(res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit));
        } // end for
        console.table(tableArr);
        selectSupervisorTask();
    }); // end function, connection.query
}; // end ViewDepartmentSales function

// Add a new product to the store
var AddNewDepartment = function() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "Enter a department name: "
        },
        {
            name: "overheadcost",
            type: "input",
            message: "Enter its overhead cost: "
        }

    ]).then(function(answer) {
        connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: answer.department,
                over_head_costs: answer.overheadcost
            },
            // also update the new record with over_head_cost // EDIT HERE

            function(err) {
                if (err) throw err;
                console.log("Your new department was added successfully!");
            }
        ); // end connection query
            showDepartments();
    }); // end function
}; // end function

selectSupervisorTask();
