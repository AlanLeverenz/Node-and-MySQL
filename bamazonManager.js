var mysql = require('mysql');
var inquirer = require('inquirer');
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

var showTable = function(){
    connection.query("SELECT * FROM products", function(err,res){
        for(var i=0; i<res.length; i++){
            console.log(res[i].itemid+" || "+res[i].productname+" || "+ res[i].departmentname+" || $"+res[i].price.toFixed(2)+" || "+res[i].stockquantity );
        }
        selectManagerTask();
    });
}; // end showTable

// prompt : select manager task
var selectManagerTask = function() {
    inquirer.prompt([{
        name: 'task',
        type: 'list',
        message: 'Select a manager task.',
        choices: [ "View Products for Sale", "View Low Inventory","Add to Inventory","Add New Product","Quit" ]
    }]).then(function(answers){

        switch (answers.task) {
            case 'View Products for Sale':
                ViewProducts();
                break;
            case 'View Low Inventory':
                ViewLowInventory();
                break;
            case 'Add to Inventory':
                AddInventory();
                break;
            case 'Add New Product':
                AddNewProduct();
                break;
            case 'Quit':
                process.exit();
        } // end switch
    }); // end answers function
}; // end function


// VIEW PRODUCTS ====
var ViewProducts = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(var i=0; i<res.length; i++) {
            console.log(res[i].itemid+" || "+res[i].productname+" || "+ res[i].departmentname+" || $"+res[i].price.toFixed(2)+" || "+res[i].stockquantity );
        }
        selectManagerTask();
    });
};

// VIEW LOW INVENTORY ====
var ViewLowInventory = function() {
    connection.query("SELECT * FROM products WHERE stockquantity < 5", function(err, res) {
        if (err) throw err;
        if (res.length < 1) {
            console.log("All products have 5 or more items in stock.");
        } else {
            for(var i=0; i<res.length; i++){
                console.log(res[i].itemid+" || "+res[i].productname+" || "+ res[i].departmentname+" || $"+res[i].price.toFixed(2)+" || "+res[i].stockquantity );
            } // end for
        } // end if else  
        selectManagerTask();     
    });
};


// ADD INVENTORY ====
var AddInventory = function() {
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        for(var i=0; i<res.length; i++) {
            console.log(res[i].itemid+" || "+res[i].productname+" || "+ res[i].departmentname+" || $"+res[i].price.toFixed(2)+" || "+res[i].stockquantity );
        }
        promptManager(res);
    });
};

// promptManager
var promptManager = function(res){
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: "Enter the ID of the product you want to add more items of."
    }]).then(function(answer){

        for(var i=0; i<res.length; i++){
            if(res[i].itemid==answer.choice){
                correct=true;
                var id = i;
                var product = res[i].productname;

                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many do you want to add?",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer){
                    var stock = parseInt(res[id].stockquantity);
                    var items = parseInt(answer.quantity);
                    stock = stock + items;
                    connection.query("UPDATE products SET stockquantity='"+stock+"' WHERE productname='"+product+"'", function(err,res2){
                        console.log("Inventory added!");
                        showTable();
                    })
                });
            };
        };
        if(i==res.length && correct==false){
            console.log("Not a valid selection!");
            promptCustomer(res);
        };
    });
};


// Add a new product to the store
var AddNewProduct = function() {

    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "What product would you like to add?"
        },
        {
            name: "department",
            type: "input",
            message: "What department is it in?"
        },
        {
            name: "price",
            type: "input",
            message: "What is its selling price?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many items to add to stock?"
        }
    ]).then(function(answer) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                productname: answer.product,
                departmentname: answer.department,
                price: answer.price,
                stockquantity: answer.quantity
            },
            function(err) {
                if (err) throw err;
                console.log("Your product was added successfully!");
                selectManagerTask();
            }
        ); // end connection query
    }); // end function
}; // end function

selectManagerTask();
