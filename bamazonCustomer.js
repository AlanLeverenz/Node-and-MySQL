var mysql = require('mysql');
var inquirer = require('inquirer');

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
    makeTable();
});

var makeTable = function(){
    connection.query("SELECT * FROM products", function(err,res){
        for(var i=0; i<res.length; i++){
            console.log(res[i].itemid+" || "+res[i].productname+" || "+ res[i].departmentname+" || $"+res[i].price.toFixed(2)+" || "+res[i].stockquantity );
        }
        promptCustomer(res);
    })
}

var promptCustomer = function(res){
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: "Enter the ID of the product you want to buy. [Quit with Q]"
    }]).then(function(answer){
        var correct = false;
        if(answer.choice.toUpperCase()=="Q"){
            process.exit();
        }
        for(var i=0; i<res.length; i++){
            if(res[i].itemid==answer.choice){
                correct=true;
                var id = i;
                var product = res[i].productname;

                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to buy?",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer){

                    if( (res[id].stockquantity-answer.quantity) > 0) {
                        console.log("Product sales before = " + res[id].product_sales);
                        connection.query("UPDATE products SET stockquantity='"+(res[id].stockquantity-answer.quantity)+"' WHERE productname='"+product+"'", function(err,res2){
                            console.log("Product purchased!");
                            console.log("Quantity = " + answer.quantity);
                            console.log("Product = " + res[id].productname);
                        }) // end function, connection.query
                        // set product_sales variable
                        var newProdSales = res[id].product_sales;
                        newProdSales =+ res[id].price * answer.quantity;
                        connection.query("UPDATE products SET product_sales='"+newProdSales+"' WHERE productname='"+product+"'", function(err,res3){
                            // console.log("Price = " + res[id].price);
                            // console.log("Quantity = " + answer.quantity);
                            // console.log("newProdsales = "+ newProdSales);
                            // console.log("Product = " + res[id].productname);
                            makeTable();
                        }); // end function, connection.query
                    } // end it
                    else {
                        console.log("Not a valid selection!");
                        promptCustomer(res);
                    } // end else
                }) // end function
            } // end if
        } // end for
        if(i==res.length && correct==false){
            console.log("Not a valid selection!");
            promptCustomer(res);
        }
    }) // end then function
}; // end function

module.exports = { makeTable: makeTable, promptCustomer: promptCustomer };
