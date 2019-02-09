var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    startup();
});


function startup() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View products for sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View products for sale":
          listProducts();
          break;
  
        case "View Low Inventory":
          lowInventory();
          break;  

        case "Add to Inventory":
          addInventory();
          break;  

        case "Add New Product":
          addProduct();
          break;  
        }
      });
  }

function listProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (i = 0; res.length > i; i++) {
            console.log("\nProduct ID: " + res[i].id + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nInventory: " + res[i].quantity + "\n");
        };
    startup();
    });
};

function lowInventory() {
    connection.query("SELECT * FROM products WHERE quantity < '5'", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (i = 0; res.length > i; i++) {
            console.log("\nProduct ID: " + res[i].id + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nInventory: " + res[i].quantity + "\n");
        };
    startup();
    });
};

function addInventory() {
    inquirer
    .prompt([{
      type: "input",
      message: "What product ID?",
      name: "id"
    },{
        type: "input",
        message: "Add how many units?",
        name: "add" 
    }])
    .then(function(answer) {
        connection.query("UPDATE products SET ? WHERE ?", function(err, res) {
            [
            {
                quantity: answer.add
            },
            {
                id: answer.id
            }
            ],
            function(err, res) {
            }
        });
    console.log("Inventory Updated\n");
    console.log("===========================================\n");
});
};


function addProduct() {
    console.log("Adding a new product...\n");
    inquirer
    .prompt([{
      type: "input",
      message: "What product name?",
      name: "name"
    },{
        type: "input",
        message: "What product department?",
        name: "dept"
    },{
        type: "input",
        message: "What sale price?",
        name: "price"
    },{
        type: "input",
        message: "Add how many inventory units?",
        name: "quantity" 
    }])
    .then(function(answer) {
        var query = connection.query("INSERT INTO products SET ?", {
                product_name: answer.name,
                department_name: answer.dept,
                price: answer.price,
                quantity: answer.quantity
        },
        function(err, res) {
            console.log(answer.name + " inserted!\n");
        });
    });
};

