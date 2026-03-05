import React from 'react';

function MenuSection({ title, instruction, type, options, groups, value, values, onChange, fieldName }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <p style={{ color: '#9ca3af', margin: '0 0 12px', fontSize: '14px' }}>{instruction}</p>
      
      {options ? (
        <div className="options-grid">
          {options.map(option => (
            <label key={option}>
              <input
                type={type}
                name={fieldName}
                value={option}
                checked={type === 'radio' ? value === option : values.includes(option)}
                onChange={onChange}
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        Object.entries(groups || {}).map(([groupName, groupOptions]) => (
          <div key={groupName}>
            <div className="sub">{groupName}</div>
            <div className="option-group">
              {groupOptions.map(option => (
                <label key={option}>
                  <input
                    type={type}
                    name={fieldName}
                    value={option}
                    checked={type === 'radio' ? value === option : values.includes(option)}
                    onChange={onChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default MenuSection;
