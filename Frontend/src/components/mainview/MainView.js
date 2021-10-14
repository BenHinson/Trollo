import React from "react";

export default function MainView({ columns }) {
  console.log("rendering main view", columns);
  // On a click on board, retrieve columns for given board

  const cols = Object.values(columns).map((column) => {
    return (
      <div key={column.id}>
        <h2>{column.name}</h2>
      </div>
    );
  });

  // Retrieve tasks for columns
  return (
    <section className="main-view" style={mainSection}>
      <p>Here go project members</p>
      {cols}
    </section>
  );
}

const mainSection = {
  width: "75vw",
  padding: "1rem",
};
