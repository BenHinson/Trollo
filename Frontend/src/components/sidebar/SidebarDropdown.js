import React, { Fragment, useState } from "react";
import Form from "../Form";
import { sidebar } from "../../Styling/Stylesheet";


export default function SidebarDropdown({
  name,
  arr,
  handleSelect,
  handleSubmit,
  handleDelete,
}) {
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
    <Form handleSubmit={handleSubmit} hideForm={hideForm} formType={name} />
  );

  const components = arr.map((el) => (
    <li
      key={el.id}
      id={el.id}
      onClick={() => handleSelect(el.id)}
    >
      <span id={el.id}>{el.name}</span>
      <button id={el.id} className='deleteBtn' onClick={() => handleDelete(el.id)}>✕</button>
    </li>
  ));

  console.log(name);

  return (
    <Fragment>
      <div className={`sideBarDropdown ${name}`}>
        <p>{name}</p>
        <span className="sidebar-btns">
          <button onClick={showForm} className="add">＋</button>
        </span>
      </div>
      <div className={`${name}-list pageList`}>{components}</div>
      {formComponent}
    </Fragment>
  );
}
