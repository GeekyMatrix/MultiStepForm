import React from "react";

const InputField = ({ label, name, value, onChange, error, type = "text" }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        className="form-control"
      />
      {error && <div className="text-danger small">{error}</div>}
    </div>
  );
};

export default InputField;
