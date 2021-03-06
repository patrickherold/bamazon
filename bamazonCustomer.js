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
          "Browse Products",
          "Buy something"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Browse Products":
        listProducts();
          break;
  
        case "Buy something":
          buyProduct();
          break;  
        }
      });
  }

function listProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (i = 0; res.length > i; i++) {
            console.log("\nProduct ID: " + res[i].id + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\n");
        };
    startup();
    });
};


function buyProduct() {
    inquirer
    .prompt([
        {
          name: "product_id",
          type: "input",
          message: "What product ID would you like to purchase: ",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "purchase_number",
          type: "input",
          message: "How many?: ",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        connection.query('SELECT * FROM products WHERE ?', { id: answer.product_id }, function(err, res) {
          if (answer.purchase_number < res[0].quantity) {
            var quantity = parseInt(answer.purchase_number);
            var price = parseFloat(res[0].price);
            var total = quantity * price;
            var total = total.toFixed(2);
            for (var i = 0; i < answer.purchase_number; i++) {
                console.log("Item: " + res[0].product_name);
            };
            console.log("price per unit: " + res[0].price);
            console.log("=========================\n");
            console.log("Total due: $" + total);
            console.log('-------------------------\n');
            newInventory = res[0].quantity - answer.purchase_number;
            updateInventory(newInventory, answer.product_id);
          }
          else {
              console.log('Sorry we do not have that many');
          }
          startup();
        });
      });
  }


function updateInventory(newInventory, product_id) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            quantity: newInventory
          },
          {
            id: product_id
          }
        ],
        function(err, res) {
        }
    );
    console.log("Product ID: " + product_id + " inventory is now: " + newInventory + " units.");
    console.log("===========================================\n");
};





