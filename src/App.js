import React, { useEffect, useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';


const App = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/employees')
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.log(error));
  }, []);

  const addEmployee = (employee) => {
    fetch('http://localhost:8080/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    })
      .then((response) => response.json())
      .then((data) => setEmployees([...employees, data]))
      .catch((error) => console.log(error));
  };

  

  return (
    <div>
      <h1>Employee Management</h1>
      <EmployeeForm addEmployee={addEmployee} />
      <EmployeeList employees={employees}  />

    </div>
  );
};

export default App;
