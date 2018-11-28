var mysql = require("mysql");
var inquirer = require("inquirer");


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

});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        res.forEach(function(r){
            console.log(`${r.item_id} | ${r.department_name} | ${r.price} | ${r.stock_quantity}`);
        })
        askQuestion();

    // connection.end();
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
        var inputID = user.id;
        var unitsOrdered = user.stock;

      
        console.log(inputID + unitsOrdered);
    });
}

