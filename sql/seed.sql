-- Insert departments
INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('Human Resources');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 90000, 1),
('Data Analyst', 70000, 1),
('Accountant', 60000, 2),
('HR Specialist', 50000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),       -- John is a Software Engineer with no manager
('Jane', 'Smith', 2, 1),       -- Jane is a Data Analyst managed by John
('Emily', 'Davis', 3, NULL),   -- Emily is an Accountant with no manager
('Michael', 'Brown', 4, NULL); -- Michael is an HR Specialist with no manager
