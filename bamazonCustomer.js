var mysql = require("mysql");
var inquirer = require("inquirer");

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
    console.log("connected as id " + connection.threadId);
    afterConnection();
    // connection.end();

});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // console.log(res);
        res.forEach(function(r){
            console.log(`${r.item_id} | ${r.department_name} | ${r.price} | ${r.stock_quantity}`);
        })
        askQuestion();

    })
} 

function askQuestion(){
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
        inputID = user.id;
        unitsOrdered = user.stock;

        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            // var printItem = res[inputID].product_name;
            var itemStock = res[inputID].stock_quantity;
            var newStock = itemStock - unitsOrdered;
            var total = (res[inputID].price)*unitsOrdered
            // Log all results of the SELECT statement
            if(newStock >= 0){
                console.log("Your order has been placed! Your total is " + total);
                console.log(newStock);

                var query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                      [
                        {
                            stock_quantity: newStock
                        },
                        {
                            item_id: inputID 
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
                        askQuestion();
                    }else if(answer === "NO"){
                        console.log("Come again :)")
                        connection.end();
                    }
              });
            }
          });

    });

}

function showList(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        res.forEach(function(r){
            console.log(`${r.item_id} | ${r.department_name} | ${r.price} | ${r.stock_quantity}`);
        })

    })

}
