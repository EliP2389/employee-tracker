var inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection');
const { promise } = require('./db/connection');

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

            if (choices === "View all departments") {
                displayDepartments();
            }
            if (choices === "View all roles") {
                displayRoles();
            }
            if (choices === "View all employees") {
                displayEmployees();
            }
            if (choices === "Add a department") {
                addNewDepartment();
            }
            if (choices === "Add a role") {
                addNewRole();
            }
            if (choices === "Add an employee") {
                addNewEmployee();
            }
            if (choices === "Update employee role") {
                updateEmployeeRole();
            }
        })
}
const displayDepartments = () => {

    const sql = `SELECT * FROM department`;

    connection.query(sql, (err, res) => {
        if (err) throw err;

        console.table(res)

        loadMainMenu()
    });
};

const displayRoles = () => {

    const sql = `SELECT id, title FROM roles`;

    connection.query(sql, (err, res) => {
   if(err) throw err;
        console.table(res)

        loadMainMenu()
    });
};

const displayEmployees = () => {

    const sql = `SELECT id, first_name, last_name FROM employees`;

    connection.query(sql, (err, res) => {
        if (err) throw err;
      
        console.table(res)

        loadMainMenu()
    });
};

// function to add a department 
const addNewDepartment = () => {
    inquirer
        .prompt([
            {
               type: 'input',
               name: 'addId',
               message: 'Add an ID',
               input: "",
               validate: addId => {
                   if (addId) {
                       return true;
                   } else {
                       console.log('Please enter an Id');
                       return false;
                   }
               }            
            },
            {
                type: 'input',
                name: 'addDepartment',
                message: "Add new department name",
                input: "",
                validate: addDepartment => {
                    if (addDepartment) {
                        return true;
                    } else {
                        console.log('Please enter a department');
                        return false;
                    }
                }
            }
        ])
        .then((answer) => {
            const { input } = answer;
              const sql = `INSERT INTO department (id, name_) VALUES ("${answer.addId}","${answer.addDepartment}")`;

              connection.promise().query(sql, input, (err, res) => {
                  if (err) throw err;

                  console.table(res)

                   loadMainMenu()
              }) ;

        });
};

const addNewRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addRoleId',
                message: "Add a role ID",
                input: "",
                validate: addRoleId => {
                    if (addRoleId) {
                        return true;
                    } else {
                        console.log('Please enter a Role Id');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addRoleTitle',
                message: "Add role TITLE",
                input: "",
                validate: addRoleTitle => {
                    if (addRoleTitle) {
                        return true;
                    } else {
                        console.log('Please enter a Role Titile');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addRoleSalary',
                message: "Add role Salary",
                input: "",
                validate: addRoleSalary => {
                    if (addRoleSalary) {
                        return true;
                    } else {
                        console.log('Please enter a Role Salary');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addDeptId',
                message: "What Department Id do you want to add role to?",
                input: "",
                validate: addDeptId => {
                    if (addDeptId) {
                        return true;
                    } else {
                        console.log("Please enter Dept for role")
                        return false;
                    }
                }
            }
        ])
        .then((answer) => {
            const { input } = answer;
            const sql = `INSERT INTO roles (id, title, salary, department_id) VALUES ("${answer.addRoleId}","${answer.addRoleTitle}","${answer.addRoleSalary}","${answer.addDeptId}")`;
            connection.query(sql, input, (err, res) => {
                if (err) throw err;
                console.log('Added ' + answer.addRoleId + answer.addRoleTitle + answer.addRoleSalary + answer.addDeptId + " to roles!");

                console.table(res);

                loadMainMenu()
            })
        })
}
const addNewEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addEmpId',
                message: "Add an ID for the employee?",
                validate: addDept => {
                    if (addDept) {
                        return true;
                    } else {
                        console.log('Please enter a Employee ID');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addFirstName',
                message: "What is the employee's first name?",
                validate: addDept => {
                    if (addDept) {
                        return true;
                    } else {
                        console.log('Please enter a Employee first name');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addLastName',
                message: "What is the employee's last name?",
                validate: addDept => {
                    if (addDept) {
                        return true;
                    } else {
                        console.log('Please enter a Employee last name');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addRoleId',
                message: "What Role ID is this employee connected to?",
                validate: addDept => {
                    if (addDept) {
                        return true;
                    } else {
                        console.log('Please enter a Employee role id');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addManagerId',
                message: "What manager ID is this employee connected to?",
                validate: addDept => {
                    if (addDept) {
                        return true;
                    } else {
                        console.log('Please enter a Employee manager id');
                        return false;
                    }
                }
            }
        ])
        .then(answer => {
            const sql = `INSERT INTO roles (id, first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?,?)`;
            connection.query(sql, answer.addEmployee, (err, result) => {
                if (err) throw err;
                console.log('Added ' + answer.addEmployee + " to employee!");
            })
        })
}
loadMainMenu()