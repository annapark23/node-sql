var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
const chalk = require('chalk');



var inputID;
var unitsOrdered;


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection ID: " + connection.threadId);
    afterConnection();
    // connection.end();

});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        showList();
        askQuestion();

    })
} 

function askQuestion(){

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer.prompt([

            {
            type: "input",
            name: "id",
            message: "What is the ID of the item you'd like to purchase?"
            },
            {
                type: "input",
                name: "stock",
                message: "How many units would you like to buy?"
            }
        ]).then(function(user) {
            inputID = user.id-1;
            unitsOrdered = user.stock;
            // console.log(inputID);

            if(user.id > 10){
                console.log(chalk.bold.red("Please enter a valid item ID"));
                inquirer.prompt([

                    {
                      type: "list",
                      name: "again",
                      message: "Would you like to continue shopping?",
                      choices: ["YES", "NO"]
                    }
                  ]).then(function(user) {
                    var answer = user.again;
                    
                    if(answer === "YES"){
                        afterConnection();
                    }else if(answer === "NO"){
                        console.log("Come again :)")
                        connection.end();
                    }
              });

            } else{

        
            // var printItem = res[inputID].product_name;
            var itemStock = res[inputID].stock_quantity;
            var newStock = itemStock - unitsOrdered;
            var total = (res[inputID].price)*unitsOrdered
            var num = total.toFixed(2);
            // console.log(num);
            // Log all results of the SELECT statement
            if(newStock >= 0){
                console.log(chalk.green("Your order has been placed! Your total is $" + chalk.green.underline.bold(num)));
                // console.log(newStock);

                var query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                      [
                        {
                            stock_quantity: newStock
                        },
                        {
                            item_id: inputID+1 
                        }
                      ],
                    function(err, res) {
                       console.log(res.affectedRows + " products updated!\n");
                        showList();
                    
                      connection.end();

                    }

                  );

            } else if (newStock < 0){
                console.log("Insufficient quantity!");
                inquirer.prompt([

                    {
                      type: "list",
                      name: "again",
                      message: "Would you like to continue shopping?",
                      choices: ["YES", "NO"]
                    }
                  ]).then(function(user) {
                    var answer = user.again;
                    
                    if(answer === "YES"){
                        afterConnection();
                    }else if(answer === "NO"){
                        console.log(chalk.yellow("Come again :)"));
                        connection.end();
                    }
              });
            }

        }
          });

    });

}

function showList(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("\n");
        console.table([
            {
                ID: res[0].item_id,
                Name: res[0].product_name,
                Department: res[0].department_name,
                Price: res[0].price,
                Stock: res[0].stock_quantity
            },
            {
                ID: res[1].item_id,
                Name: res[1].product_name,
                Department: res[1].department_name,
                Price: res[1].price,
                Stock: res[1].stock_quantity
            },
            {
                ID: res[2].item_id,
                Name: res[2].product_name,
                Department: res[2].department_name,
                Price: res[2].price,
                Stock: res[2].stock_quantity
            },
            {
                ID: res[3].item_id,
                Name: res[3].product_name,
                Department: res[3].department_name,
                Price: res[3].price,
                Stock: res[3].stock_quantity
            },
            {
                ID: res[4].item_id,
                Name: res[4].product_name,
                Department: res[4].department_name,
                Price: res[4].price,
                Stock: res[4].stock_quantity
            },
            {
                ID: res[5].item_id,
                Name: res[5].product_name,
                Department: res[5].department_name,
                Price: res[5].price,
                Stock: res[5].stock_quantity
            },
            {
                ID: res[6].item_id,
                Name: res[6].product_name,
                Department: res[6].department_name,
                Price: res[6].price,
                Stock: res[6].stock_quantity
            },
            {
                ID: res[7].item_id,
                Name: res[7].product_name,
                Department: res[7].department_name,
                Price: res[7].price,
                Stock: res[7].stock_quantity
            },
            {
                ID: res[8].item_id,
                Name: res[8].product_name,
                Department: res[8].department_name,
                Price: res[8].price,
                Stock: res[8].stock_quantity
            },
            {
                ID: res[9].item_id,
                Name: res[9].product_name,
                Department: res[9].department_name,
                Price: res[9].price,
                Stock: res[9].stock_quantity
            }
        ]);

    })

}

