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

// Prompt user to choose an action
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

// Prompt user which department to add and update table
function addDept() {
  inquirer
  .prompt({
    name: "department",
    message: "Please input department name:",
    type: "input"
  }).then(function(response){
    connection.query(
      "INSERT INTO department SET ?",
      {
        department_name: response.department
      },
      function(err, res) {
        if (err) throw err;
        console.log(response.department + " has been added!\n");
        selectOptions();
      }
    );
  });
}


function addRole() {
  inquirer
  .prompt([
    {
      name: "title",
      message: "Please input role title:",
      type: "input"
    },
    {
      name: "salary",
      message: "Please input salary for this role:",
      type: "number"
    },
    {
      name: "department_id",
      message: "Please input deparmtnet ID for this role:",
      type: "number"
    }
  ]).then(function(response){
    connection.query(
      "INSERT INTO role SET ?",
      [
        {
          title: response.title,
          salary: response.salary,
          department_id: response.department_id
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(response.title + " has been added!\n");
        selectOptions();
      }
    );
  });
}

function addEmployee() {
  inquirer
  .prompt([
    {
      name: "first_name",
      message: "Please insert employee's first name:",
      type: "input"
    },
    {
      name: "last_name",
      message: "Please insert employee's last name:",
      type: "input"
    },
    {
      name: "role_id",
      message: "Please insert employee's role ID:",
      type: "number" 
    },
    {
      name: "manager_id",
      message: "Does this employee have a manager? 1 = Yes, 0 = No",
      type: "list",
      choices: [1, 2]
    },
  ]).then(function(response){
    
    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: response.first_name,
        last_name: response.last_name,
        role_id: response.role_id,
        manager_id: response.manager_id
      },
      function(err, res) {
        if (err) throw err;
        console.log(response.first_name + " " + response.last_name + " has been added!\n");
        selectOptions();
      }
    );
  });
}

function viewDept() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    selectOptions();
  });
}

function viewRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    selectOptions();
  });
}

function viewEmployee() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    selectOptions();
  });
}

function updateEmployee() {
  inquirer
  .prompt([
    {
      name: "employee_id",
      message: "Please input employee id:",
      type: "number"
    },
    {
      name: "new_role",
      message: "Please input employee's new role:",
      type: "number"
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