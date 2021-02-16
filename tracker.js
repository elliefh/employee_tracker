// Dependencies 
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
require("dotenv").config();

// Create connection object 
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employeeDB"
});

// Listen 
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    selectOptions();
});

function selectOptions() {
  inquirer
  .prompt({
    name: "option",
    message: "What would you like to do?",
    type: "list",
    choices: ["Add department", "Add role", "Add employee", "View Departments", "View roles", "View employees", "Update employee role"]
  }).then(function(response){
    switch(response.option) {
      case "Add department": 
        addDept();
        break;
      case "Add role": 
        addRole();
        break;
      case "Add employee": 
        addEmployee();
        break;
      case "View Departments": 
        viewDept();
        break;
      case "View roles": 
        viewRole();
        break;
      case "View employees": 
        viewEmployee();
        break;
      case "Update employee role": 
        updateEmployee();
        break;
    };
  });
}

function addDept() {
  inquirer
  .prompt({
    name: "department",
    message: "Please insert department name:",
    type: "input"
  }).then(function(response){
    connection.query(
      "INSERT INTO department SET ?",
      {
        department_name: response.department
      },
      function(err, res) {
        if (err) throw err;
        console.log(response.department + " inserted!\n");
        selectOptions();
      }
    );
  });
}

function addRole() {
  selectOptions();
}

function addEmployee() {
  selectOptions();
}

function viewDept() {
  console.log("Selecting all departments...\n");
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    selectOptions();
  });
}

function viewRole() {
  selectOptions();
}

function viewEmployee() {
  selectOptions();
}

function updateEmployee() {
  // console.log("Updating all Rocky Road quantities...\n");
  inquirer
  .prompt([
    {
      name: "employee_id",
      message: "Please type employee id:",
      type: "input"
    },
    {
      name: "new_role",
      message: "Please type employee's new role:",
      type: "input"
    }
  ]).then(function(response){
    connection.query(
      "UPDATE employee SET ? WHERE ?",
      [{
        role_id: response.new_role
      },
      {
        id: response.employee_id
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(response.employee_id + " role updated!\n");
      selectOptions();
    }
    )
  });
}