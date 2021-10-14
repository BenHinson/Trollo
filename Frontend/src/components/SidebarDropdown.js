import React from "react";

export default function SidebarDropdown({ name, arr, handleClick }) {
  const components = arr.map((el) => (
    <button key={el.id} onClick={() => handleClick(el.id)}>
      {el.name}
    </button>
  ));

  return (
    <div>
      <div>{name}</div>
      <div>{components}</div>
    </div>
  );
}
