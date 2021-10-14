import React, { useState } from "react";

export default function Form({ handleSubmit, hideForm, formType }) {
  const [value, setValue] = useState("");

  const updateValue = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    handleSubmit(value, formType);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder={`type ${formType}`}
        value={value}
        onChange={updateValue}
      />
      <button>+ Create Project</button>
      <span onClick={hideForm} id={`${formType}-form`}>
        X
      </span>
    </form>
  );
}
