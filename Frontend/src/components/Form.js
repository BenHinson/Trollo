import React, { useState } from "react";

export default function Form({ handleSubmit, hideForm, formType }) {
  const [value, setValue] = useState("");

  const updateValue = (e) => {
    console.log("This is form type: ", formType);
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(value, formType);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder={`${formType} Name...`}
        value={value}
        onChange={updateValue}
      />
      <button className='acceptBtn'>✓</button>
      <button className='cancelBtn' onClick={hideForm} id={`${formType}-form`}>✕</button>
    </form>
  );
}
