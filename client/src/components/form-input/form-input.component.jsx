import React from "react";
import "./form-input.styles.css";
const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="form__group field">
      <input
        type="text"
        className="form__field"
        onChange={handleChange}
        {...otherProps}
      />
      {label ? (
        <label for="name" className="form__label">
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;