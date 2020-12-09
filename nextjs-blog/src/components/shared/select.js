import React from 'react'

const Select = ({ label, value, onChange, options }) => {
    return (
        <div>
            {label}
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {/*Array of options, Key necessary for React, onChange: return itself */}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

        </div>
    );
};

export default Select;
