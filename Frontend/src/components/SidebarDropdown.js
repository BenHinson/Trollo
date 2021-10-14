import React, { useState } from "react";
import Form from "./Form";

export default function SidebarDropdown({ name, arr, handleSelect, handleSubmit }) {
  const [formVisibility, setFormVisibility] = useState(false);

  const showForm = () => {
    console.log("Showing form");
    setFormVisibility(true);
  };

  const hideForm = () => {
    console.log("Hiding form");
    setFormVisibility(false);
  };

  const formComponent = formVisibility && (
    <Form
      handleSubmit={handleSubmit}
      hideForm={hideForm}
      formType={name}
    />
  );

  const components = arr.map((el) => (
    <button key={el.id} id={el.id} onClick={() => handleSelect(el.id)}>
      {el.name}
    </button>
  ));

  return (
    <div>
      <div>{name}</div>
      <div>{components}</div>
      <button onClick={showForm}>+</button>
      {formComponent}
    </div>
  );
}
