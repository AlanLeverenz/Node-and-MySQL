var mysql = require('mysql');
var inquirer = require('inquirer');
var customer = require('./bamazonCustomer.js');

var myCus = customer.promptCustomer;


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootAWL69",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connection successful!");
    promptUser();
});

var promptUser = function() {
    inquirer.prompt([{
        type: 'list',
        name: 'CMS',
        message: "Who are you? [Quit with Q]",
        choices: [ 'Customer', 'Manager', 'Supervisor' ]
    }]).then(function(answer){
        if(answer.CMS.toUpperCase()=="Q") {
            process.exit();
        }
        if(answer.CMS == 'Customer'){
            myCus;
        }
        if(answer.CMS == 'Manager'){
            console.log("A MANAGER!");
        }
        if(answer.CMS == 'Supervisor'){
            console.log("A SUPERVISOR!");
        }
    })
}

