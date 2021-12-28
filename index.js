var inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection');

const loadMainMenu = () => {
    inquirer
     .prompt([
         {
         type: "rawlist",
         name: "choices",
         message: "What would you like to do?",
         choices: [
             "View all departments",
             "View all roles",
             "View all employees",
             "Add a department",
             "Add a role",
             "Add an employee",
             "Update employee role"
         ]
     }
 ])
 .then((selections) => {
    const { choices } = selections;

    if(choices === "View all departments") {
        displayDepartments();
    }
    if(choices === "View all roles") {
        displayRoles();
    }
    if(choices === "View all employees") {
        displayEmployees();
    }
    if(choices === "Add a department") {
        addNewDepartment();
    }
    if(choices === "Add a role") {
        addNewRole();
    }
    if(choices === "Add an employee") {
        addNewEmployee();
    }
    if(choices === "Update employee role") {
        updateEmployeeRole();
    }
})
}
const displayDepartments = () => {

    const sql = "SELECT * FROM department"

    connection.query(sql, (err, res) => {
        if(err) {
            return (err)
        }
        return console.table(res)
    });
};

const displayRoles = () => {

    const sql = "SELECT id, title FROM roles"

    connection.query(sql, (err, res) => {
        if(err) {
            return (err)
        }
        return console.table(res)
    });
};
const displayEmployees = () => {

    const sql = "SELECT id, first_name, last_name FROM employees"

    connection.query(sql, (err, res) => {
        if(err) {
            return (err)
        }
        return console.table(res)
    });
};
loadMainMenu()











