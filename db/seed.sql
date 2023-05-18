INSERT INTO department ( name)
VALUES
    ('Sales'),
    ('Marketing'),
    ( 'Engineering'),
    ( 'Human Resources');

INSERT INTO role ( title, salary, department_id)
VALUES
    ( 'Sales Manager', 5000.00, 1),
    ( 'Sales Representative', 3000.00, 1),
    ( 'Marketing Manager', 4500.00, 2),
    ( 'Marketing Coordinator', 2500.00, 2),
    ( 'Software Engineer', 6000.00, 3),
    ( 'Quality Assurance Engineer', 4000.00, 3),
    ( 'HR Manager', 4800.00, 4),
    ( 'HR Specialist', 3200.00, 4);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES
    ( 'John', 'Doe', 1, NULL),
    ( 'Jane', 'Smith', 2, 1),
    ( 'Michael', 'Johnson', 3, NULL),
    ( 'Emily', 'Davis', 4, 3),
    ( 'David', 'Wilson', 5, NULL),
    ( 'Sarah', 'Anderson', 6, 5),
    ( 'Matthew', 'Taylor', 7, NULL),
    ( 'Olivia', 'Thomas', 8, 7);
