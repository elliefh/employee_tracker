USE employeeDB;

INSERT INTO department
    (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Human Resources"),
    ("Finance"),
    ("Legal");

INSERT INTO role 
    (title, salary, department_id)
VALUES
    ("Sales Team Lead", 100000, 1),
    ("Sales Associate", 75000, 1),
    ("Engineer Team Lead", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Talent Team Lead", 200000, 3),
    ("Talent Associate", 75000, 3),
    ("Finance Team Lead", 150000, 4),
    ("Finance Associate", 120000, 4),
    ("Legal Team Lead", 150000, 5),
    ("Law Associate", 120000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Chandler", "Bing", 1, NULL),
    ("Joey", "Tribbiani", 1, NULL),
    ("Phoebe", "Buffay", 1, NULL),
    ("Rachel", "Green", 1, NULL),
    ("Monica", "Geller", 1, NULL),
    ("", "", 1, NULL),
    ("Mike", "Hannigan", 1, NULL),
    ("Jill", "Green", 1, NULL),
    ("Richard", "Burr", 1, NULL),
    ("Janice", "Hosenstein", 1, NULL),
    ("Charlie", "Wheeler", 1, NULL)