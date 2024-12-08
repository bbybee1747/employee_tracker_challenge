import { db } from './db';
import { Department, Role, Employee } from './types';

export const getDepartments = async (): Promise<Department[]> => {
    const result = await db.query('SELECT * FROM department;');
    return result.rows;
};

export const getRoles = async (): Promise<Role[]> => {
    const query = `
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id;
    `;
    const result = await db.query(query);
    return result.rows;
};

export const getEmployees = async (): Promise<Employee[]> => {
    const query = `
        SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary,
               COALESCE(CONCAT(m.first_name, ' ', m.last_name), 'None') AS manager
        FROM employee e
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id;
    `;
    const result = await db.query(query);
    return result.rows;
};

export const addDepartment = async (name: string): Promise<void> => {
    await db.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

export const addRole = async (title: string, salary: number, department_id: number): Promise<void> => {
    await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [
        title,
        salary,
        department_id,
    ]);
};

export const addEmployee = async (
    first_name: string,
    last_name: string,
    role_id: number,
    manager_id: number | null
): Promise<void> => {
    await db.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        [first_name, last_name, role_id, manager_id]
    );
};

export const updateEmployeeRole = async (employee_id: number, role_id: number): Promise<void> => {
    await db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
};