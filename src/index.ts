import inquirer from 'inquirer';
import { connectDB } from './db';
import {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
} from './queries';

const menu = async (): Promise<void> => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Update employee manager', 
                'View employees by manager', 
                'View employees by department', 
                'Delete a department', 
                'Delete a role', 
                'Delete an employee', 
                'Exit',
            ],
        },
    ]);

    switch (action) {
        case 'View All Departments':
            console.table(await getDepartments());
            break;

        case 'View All Roles':
            console.table(await getRoles());
            break;

        case 'View All Employees':
            console.table(await getEmployees());
            break;

        case 'Add a Department':
            const { name } = await inquirer.prompt([{ type: 'input', name: 'name', message: 'Enter department name:' }]);
            await addDepartment(name);
            console.log('Department added successfully.');
            break;

        case 'Add a Role':
            const departments = await getDepartments();
            const { title, salary, department_id } = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Enter role title:' },
                { type: 'input', name: 'salary', message: 'Enter role salary:' },
                { type: 'list', name: 'department_id', message: 'Select department:', choices: departments.map(dept => ({ name: dept.name, value: dept.id })) },
            ]);
            await addRole(title, parseFloat(salary), department_id);
            console.log('Role added successfully.');
            break;

        case 'Add an Employee':
            const roles = await getRoles();
            const employees = await getEmployees();
            const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
                { type: 'input', name: 'first_name', message: 'Enter employee first name:' },
                { type: 'input', name: 'last_name', message: 'Enter employee last name:' },
                { type: 'list', name: 'role_id', message: 'Select role:', choices: roles.map(role => ({ name: role.title, value: role.id })) },
                { type: 'list', name: 'manager_id', message: 'Select manager:', choices: [{ name: 'None', value: null }, ...employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))] },
            ]);
            await addEmployee(first_name, last_name, role_id, manager_id);
            console.log('Employee added successfully.');
            break;

        case 'Update an Employee Role':
            const employeeList = await getEmployees();
            const roleList = await getRoles();
            const { employee_id, new_role_id } = await inquirer.prompt([
                { type: 'list', name: 'employee_id', message: 'Select employee to update:', choices: employeeList.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })) },
                { type: 'list', name: 'new_role_id', message: 'Select new role:', choices: roleList.map(role => ({ name: role.title, value: role.id })) },
            ]);
            await updateEmployeeRole(employee_id, new_role_id);
            console.log('Employee role updated successfully.');
            break;
            
        default:
            console.log('Goodbye!');
            process.exit(0);
    }

    menu();
};

(async () => {
    await connectDB();
    menu();
})();
