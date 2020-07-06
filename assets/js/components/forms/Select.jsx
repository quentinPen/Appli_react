import React from 'react';

const Select = ({ name, label, error = "", children, value, onChange }) => {
    return (<>
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                value={value}
                onChange={onChange}
                name={name}
                id={name}
                className={"form-control" + (error && " is-invalid")}
            >
                {children}
            </select>
        </div>
        <p className="invalid-feedback">{error}</p>
    </>);
}

export default Select;