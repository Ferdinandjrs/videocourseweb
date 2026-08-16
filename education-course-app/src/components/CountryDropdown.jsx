import React, { useState } from 'react';

const CountryDropdown = () => {
  const [selected, setSelected] = useState({ code: '+62', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg' });

  const countries = [
    { code: '+62', name: 'Indonesia', flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg' },
    { code: '+1', name: 'USA', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg' },
    { code: '+44', name: 'UK', flag: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom.svg' }
  ];

  return (
    <div className="dropdown">
      <button 
        className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center bg-white border-end-0 rounded-start" 
        type="button" 
        data-bs-toggle="dropdown"
        style={{ height: '45px', borderColor: '#e0e0e0', color: '#333', fontSize: '14px' }}
      >
        <img src={selected.flag} width="20" className="me-2" alt="flag" /> 
        {selected.code}
      </button>
      <ul className="dropdown-menu">
        {countries.map((c, index) => (
          <li key={index}>
            <button className="dropdown-item d-flex align-items-center" type="button" onClick={() => setSelected(c)}>
              <img src={c.flag} width="20" className="me-2" alt={c.name} /> {c.name} ({c.code})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryDropdown;