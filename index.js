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
                    "View employees by manager",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update employee role",
                    "Update employee manager",
                    "Delete an employee"
                ]
            }
        ])
        .then((selections) => {
            const { choices } = selections;

            if (choices === "View all departments") {
                displayDepartments();
            };
            if (choices === "View all roles") {
                displayRoles();
            };
            if (choices === "View all employees") {
                displayEmployees();
            };
            if (choices === "View employees by manager") {
                displayEmpByManager();
            };
            if (choices === "Add a department") {
                addNewDepartment();
            };
            if (choices === "Add a role") {
                addNewRole();
            };
            if (choices === "Add an employee") {
                addNewEmployee();
            };
            if (choices === "Update employee role") {
                updateEmployeeRole();
            };
            if (choices === "Update employee manager") {
                updateEmployeeManager();
            };
            if (choices === "Delete an employee") {
                deleteEmployee();
            };
        });
};
const displayDepartments = () => {

    const sql = `SELECT * FROM department`;

    connection.query(sql, (err, res) => {
        if (err) throw err;

        console.table(res)

        loadMainMenu()
    });
};

const displayRoles = () => {

    const sql = `SELECT * FROM roles`;

    connection.query(sql, (err, res) => {
        if (err) throw err;

        console.table(res)

        loadMainMenu()
    });
};

const displayEmployees = () => {

    const sql = `SELECT * FROM employees`;

    connection.query(sql, (err, res) => {
        if (err) throw err;

        console.table(res)

        loadMainMenu()
    });
};

const displayEmpByManager = () => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "empManager",
            message: "Choose a manager ID to view their employees?",
            input: "",
            validate: empManager => {
                if (empManager) {
                    return true;
                } else {
                    console.log('Please enter an Id');
                    return false;
                };
            }
        }
    ])
    .then((answer) => {
        const { input } = answer;

    const sql = `SELECT * FROM employees WHERE manager_id = ("${answer.empManager}")`

    connection.query(sql, input, (err, res) => {
        if (err) throw err;

        console.table(res);

        loadMainMenu()
    })

    })
}

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
                    };
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
                    };
                }
            }
        ])
        .then((answer) => {
            const { input } = answer;
            const sql = `INSERT INTO department (id, name_) VALUES ("${answer.addId}","${answer.addDepartment}")`;

            connection.promise().query(sql, input, (err, res) => {
                if (err) throw err;

                console.log("Added" + answer.addID + answer.addDepartment + " to Department")

                console.table(res)

                loadMainMenu()
            });

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
                    };
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
                    };
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
                    };
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
                    };
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
            });
        });
};
const addNewEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'addEmpId',
                message: "Add an ID for the employee?",
                input: "",
                validate: addEmpId => {
                    if (addEmpId) {
                        return true;
                    } else {
                        console.log('Please enter a Employee ID');
                        return false;
                    };
                }
            },
            {
                type: 'input',
                name: 'addEmpFirstName',
                message: "What is the employee's first name?",
                input: "",
                validate: addEmpFirstName => {
                    if (addEmpFirstName) {
                        return true;
                    } else {
                        console.log('Please enter a Employee first name');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addEmpLastName',
                message: "What is the employee's last name?",
                input: "",
                validate: addEmpLastName => {
                    if (addEmpLastName) {
                        return true;
                    } else {
                        console.log('Please enter a Employee last name');
                        return false;
                    };
                }
            },
            {
                type: 'input',
                name: 'addEmpRoleId',
                message: "What Role ID is this employee connected to?",
                input: "",
                validate: addEmpRoleId => {
                    if (addEmpRoleId) {
                        return true;
                    } else {
                        console.log('Please enter a Employee role id');
                        return false;
                    };
                }
            },
            {
                type: 'input',
                name: 'addManagerId',
                message: "What manager ID is this employee connected to?",
                input: "",
                validate: addManagerId => {
                    if (addManagerId) {
                        return true;
                    } else {
                        console.log('Please enter a Employee manager id');
                        return false;
                    };
                }
            }
        ])
        .then((answer) => {
            const { input } = answer;
            const sql = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
        VALUES ("${answer.addEmpId}", "${answer.addEmpFirstName}", "${answer.addEmpLastName}", "${answer.addEmpRoleId}", "${answer.addManagerId}")`;
            connection.query(sql, input, (err, res) => {
                if (err) throw err;

                console.log("Added " + answer.addEmpId + answer.addEmpFirstName + answer.addEmpLastName + answer.addEmpRoleId + answer.addManagerId + " to Employee")

                console.table(res)

                loadMainMenu();
            });
        });

};

const updateEmployeeRole = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "updateEmpRole",
                message: "What new role is this Employee?",
                input: "",
                validate: updateEmpRole => {
                    if (updateEmpRole) {
                        return true;
                    } else {
                        console.log('Please update emplloyee role');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "employeeId",
                message: "What is this employee's current ID?",
                input: "",
                validate: employeeId => {
                    if (employeeId) {
                        return true;
                    } else {
                        console.log('Please enter employee ID');
                        return false;
                    };
                }
            }
        ])
        .then((answer) => {
            const { input } = answer;

            const sql = `UPDATE employees SET role_id = ("${answer.updateEmpRole}") WHERE id = ("${answer.employeeId}")`
            connection.query(sql, input, (err, res) => {
                if (err) throw err;

                console.log("Updated employee role")

                console.table(res);

                loadMainMenu()
            });
        });
};
const updateEmployeeManager = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "updateEmpManager",
                message: "Who is the employees new manager?",
                input: "",
                validate: updateEmpManager => {
                    if (updateEmpManager) {
                        return true;
                    } else {
                        console.log('Please update emplloyee role');
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "employeeId",
                message: "What is this employee's current ID?",
                input: "",
                validate: employeeId => {
                    if (employeeId) {
                        return true;
                    } else {
                        console.log('Please enter employee ID');
                        return false;
                    };
                }
            }
        ])
        .then((answer) => {
            const { input } = answer;

            const sql = `UPDATE employees SET manager_id = ("${answer.updateEmpManager}") WHERE id = ("${answer.employeeId}")`
            connection.query(sql, input, (err, res) => {
                if (err) throw err;

                console.log("Updated employee manager")

                console.table(res);

                loadMainMenu()
            });
        });
};

const deleteEmployee = () => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "deleteEmp",
            message: "Delete an employee by ID",
            input: ""
        }
    ])
    .then((answer) => {
        const { input } = answer;

        const sql = `DELETE FROM employees WHERE id = ("${answer.deleteEmp}")`

        connection.query(sql, input, (err, res) => {
            if (err) throw err;

            console.table(res)

            loadMainMenu()
        })
    })
}

loadMainMenu()