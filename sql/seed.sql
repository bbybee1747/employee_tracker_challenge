
INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('Human Resources'),
('Legal');


INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 90000, 1),
('Data Analyst', 70000, 1),
('Accountant', 60000, 2),
('HR Specialist', 50000, 3),
('Lead Engineer', 120000, 1),
('Financial Analyst', 80000, 2),
('HR Manager', 70000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),       
('Jane', 'Smith', 2, 1),       
('Emily', 'Davis', 3, NULL),   
('Michael', 'Brown', 4, NULL),
('Sarah', 'Jones', 1, 1),      
('Kevin', 'Johnson', 2, 1),    
('Emma', 'Williams', 3, 3),    
('James', 'Miller', 4, 3);