INSERT INTO department (id, name_)
 VALUES 
 (1, 'Sales'),
 (2, 'Engineering'),
 (3, 'Finance'),
 (4, 'Legal');

 INSERT INTO roles (id, title, salary, department_id)
 VALUES 
 (1, 'Software Engineer', 120000, 2),
 (2, 'Salesperson', 80000, 1),
 (3, 'Lead Engineer', 150000, 2),
 (4, 'Accountant', 125000, 3),
 (5, 'Accountant Manager', 160000, 3),
 (6, 'Legal Team Lead', 250000, 4),
 (7, 'Lawyer', 190000, 4);

 INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
 VALUES 
 (1, 'Jon', 'Snow', 6, null),
 (3, 'Iron', 'Man', 3, null),
 (5, 'Dare', 'Devil', 6, null),
 (9, 'Phillp', 'Seymore', 5, null),
 (2, 'Spider', 'Man', 1, 3),
 (4, 'Eli', 'Pagan', 1, 3),
 (6, 'John', 'Doe', 7, 1),
 (7, 'Jane', 'Doe', 7, 5),
 (8, 'Sam', 'Smith', 4, 9),
 (10, 'Hank', 'Pym', 4, 9);