var mysql = require('mysql');
var inquirer = require('inquirer');
var customer = require('./bamazonCustomer.js');

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

var makeTable = function(){
    connection.query("SELECT * FROM products", function(err,res){
        for(var i=0; i< res.length; i++){
            console.log(res[i].itemid+" || "+res[i].productname+" || "+ res[i].departmentname+" || "+res[i].price.toFixed(2)+" || "+res[i].stockquantity+"\n");
        }
        customer.promptCustomer(res);
    })
}
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
            makeTable();
        } else if 
        (answer.CMS == 'Manager'){
            console.log("A MANAGER!");
        } else if 
        (answer.CMS == 'Supervisor'){
            console.log("A SUPERVISOR!");
        }
    })
}

