import React from 'react'

const TextInput = ({ label, value, onChange, placeHolder }) => {
    return (
        <div>
            {label}
            <input value={value}
                   onChange={(e) => onChange(e.target.value)}
                   placeholder={placeHolder}
            />
        </div>
    );
};

export default TextInput;