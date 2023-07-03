import React, { useState } from 'react';

const EmployeeForm = ({ addEmployee }) => {
  const [employee, setEmployee] = useState({
    name: '',
    address: '',
    occupation: '',
    hobby: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    window.location.reload(false);
    e.preventDefault();
    addEmployee(employee);
    setEmployee({
      name: '',
      address: '',
      occupation: '',
      hobby: '',
      gender: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={employee.address}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Occupation:
        <select
          name="occupation"
          value={employee.occupation}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Software developer">Softawre developer</option>
          <option value="Data analyst">Data analyst</option>
          <option value="Manager">Manager</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <br/>
      <label>
        Hobby:
        <select
          name="hobby"
          value={employee.hobby}
          onChange={handleChange}
        
          required
        >
          <option value="">Select</option>
          <option value="Reading">Reading</option>
          <option value="Gardening">Gardening</option>
          <option value="Sports">Sports</option>
          <option value="Music">Music</option>
        </select>
      </label>
      <label>
        Gender:
        <label>
          <input
            type="checkbox"
            name="gender"
            value="Male"
            checked={employee.gender === 'Male'}
            onChange={handleChange}
          />{' '}
          Male
        </label>
        <label>
          <input
            type="checkbox"
            name="gender"
            value="Female"
            checked={employee.gender === 'Female'}
            onChange={handleChange}
          />{' '}
          Female
        </label>
      </label>
      <br/>
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
