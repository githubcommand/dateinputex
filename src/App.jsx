import React, { useState } from 'react';

const InfoForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    birthdate: '', // expecting dd/mm/yyyy
    age: 0,
  });
 // handliung event
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Calculate age whenever birthdate changes
    if (name === 'birthdate') {
      const parts = value.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // month is 0-based
        const year = parseInt(parts[2], 10);
        const birthDateObj = new Date(year, month, day);
        console.log(birthDateObj);
        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const m = today.getMonth() - birthDateObj.getMonth();
        console.log(birthDateObj.getMonth());
        if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
          age--;
        }
        setFormData(prev => ({ ...prev, age }));
      }
    }
  };

  const incrementAge = () => {
    setFormData(prev => ({
      ...prev,
      age: prev.age + 10,
    }));
  };

  return (
    <form style={{ maxWidth: '400px', margin: 'auto' }}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Birthdate (dd/mm/yyyy):</label>
        <input
          type="text"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          placeholder="dd/mm/yyyy"
        />
      </div>

      <div>
        <label>Age:</label>
        <input type="number" value={formData.age} readOnly />
        <button type="button" onClick={incrementAge}>+10</button>
      </div>
    </form>
  );
};

export default InfoForm;