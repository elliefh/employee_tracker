USE employeeDB;

INSERT INTO department
    (department_name)
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
    ("Chandler", "Bing", 1, 1),
    ("Joey", "Tribbiani", 1, NULL),
    ("Phoebe", "Buffay", 2, 1),
    ("Rachel", "Green", 2, NULL),
    ("Monica", "Geller", 3, 1),
    ("Mike", "Hannigan", 3, NULL),
    ("Jill", "Green", 4, 1),
    ("Richard", "Burr", 4, NULL),
    ("Janice", "Hosenstein", 5, 1),
    ("Charlie", "Wheeler", 5, NULL)