INSERT INTO department (id, name)
VALUES
    (1, 'Sales'),
    (2, 'Marketing'),
    (3, 'Engineering'),
    (4, 'Human Resources');

INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, 'Sales Manager', 5000.00, 1),
    (2, 'Sales Representative', 3000.00, 1),
    (3, 'Marketing Manager', 4500.00, 2),
    (4, 'Marketing Coordinator', 2500.00, 2),
    (5, 'Software Engineer', 6000.00, 3),
    (6, 'Quality Assurance Engineer', 4000.00, 3),
    (7, 'HR Manager', 4800.00, 4),
    (8, 'HR Specialist', 3200.00, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'John', 'Doe', 1, NULL),
    (2, 'Jane', 'Smith', 2, 1),
    (3, 'Michael', 'Johnson', 3, NULL),
    (4, 'Emily', 'Davis', 4, 3),
    (5, 'David', 'Wilson', 5, NULL),
    (6, 'Sarah', 'Anderson', 6, 5),
    (7, 'Matthew', 'Taylor', 7, NULL),
    (8, 'Olivia', 'Thomas', 8, 7);
