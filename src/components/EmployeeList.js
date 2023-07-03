import React, { useEffect, useState } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/employees')
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.log(error));
  }, []);

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/employees/${editEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editEmployee),
      });

      if (response.ok) {
        // Update the employees state with the updated employee
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) => (emp.id === editEmployee.id ? editEmployee : emp))
        );

        setEditEmployee(null);
      } else {
        console.log('Failed to update employee.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    window.location.reload(false);
    try {
      const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        // Remove the deleted employee from the employees state
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.id !== id)
        );
      } else {
        console.log('Failed to delete employee.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setEditEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: inputValue,
    }));
  };

  return (
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Occupation</th>
            <th>Hobby</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                {editEmployee && editEmployee.id === employee.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editEmployee.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>
                {editEmployee && editEmployee.id === employee.id ? (
                  <input
                    type="text"
                    name="address"
                    value={editEmployee.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  employee.address
                )}
              </td>
              <td>
                {editEmployee && editEmployee.id === employee.id ? (
                  <select
                    name="occupation"
                    value={editEmployee.occupation}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Software developer">Softawre developer</option>
                     <option value="Data analyst">Data analyst</option>
                    <option value="Manager">Manager</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  employee.occupation
                )}
              </td>
              <td>
                {editEmployee && editEmployee.id === employee.id ? (
                  <select
                    name="hobby"
                    value={editEmployee.hobby}
                    onChange={handleInputChange}
                    
                  >
                    <option value="">Select</option>
                    <option value="Reading">Reading</option>
                    <option value="Gardening">Gardening</option>
                    <option value="Sports">Sports</option>
                    <option value="Music">Music</option>
                  </select>
                ) : (
                  employee.hobby
                )}
              </td>
              <td>
                {editEmployee && editEmployee.id === employee.id ? (
                  <input
                    type="checkbox"
                    name="gender"
                    checked={editEmployee.gender}
                    onChange={handleInputChange}
                  />
                ) : (
                  employee.gender ? 'Male' : 'Female'
                )}
              </td>
              <td>
                {editEmployee && editEmployee.id === employee.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(employee)}>Edit</button>
                )}
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
