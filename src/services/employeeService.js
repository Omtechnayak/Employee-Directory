const API_URL = 'http://localhost:3001/employees';

/*
  This file contains all API related functions
  for performing CRUD operations on employees
  using json-server.
*/

/*
  Fetches the complete list of employees
  from the server.
*/
export const getEmployees = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

/*
  Sends new employee data to the server
  and creates a new employee record.
*/
export const createEmployee = async (employee) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  return res.json();
};

/*
  Updates existing employee data based on id.
*/
export const updateEmployee = async (id, employee) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  });
  return res.json();
};

/*
  Deletes an employee record using the id.
*/
export const deleteEmployee = async (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
