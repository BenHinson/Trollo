import React, { Fragment, useState } from "react";
import Form from "./Form";
import {
    sidebar,
    btnForOthers1,
    userInfo,
    divideIn2,
    sideBarBtns,
    selected,
    projectAndboardList,
    btnForDelete

} from "../Stylesheet";

export default function SidebarDropdown({
  name,
  arr,
  handleSelect,
  handleSubmit,
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

  console.log(arr);
  const components = arr.map((el) => (
      <li
          key={el.id}
          id={el.id}
          onClick={() => handleSelect(el.id)}
          style={{ ...divideIn2, ...projectAndboardList}}>
           <span id={el.id}>{el.name}</span>
           <button id={el.id} style={ btnForDelete}>Delete</button>
    </li>
  ));

    return (
        <Fragment>
        <p style={divideIn2} className={name}>

            <span>{name}</span>
            <span className="sidebar-btns">
                <button style={sideBarBtns}>
                ˅
                {/* {boardDropdown ? `˄` : `˅`} */}
                </button>   
                <button onClick={showForm} style={sideBarBtns} className="add">+</button>               
            </span>
                
        </p>
            <div className={`${name}-list`}>{components}</div>
            {formComponent}
        </Fragment>
  );
}
