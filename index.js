var inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection');

const loadMainMenu = () => {
    inquirer
     .prompt([
         {
         type: "rawlist",
         name: "choices",
         message: "What would ypu like to do?",
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










