/* Basic styles */

const column = {
    width: "25%",
    padding: "1rem",
    margin: "2rem",
    backgroundColor: "#dfe5ed",
    borderRadius: "10px"
}

const columnTitle = {
    color: "#4d5d66",
    fontWeight: "bold"
}

const task = {
    backgroundColor: "#f5f5f5",
    boarderRadius: "10px",
    padding: "1rem"
}

const taskHoverAndFocus = {
    border: "1px solid #763bff"
}

const btnForColumn = {
    cursor: "pointer",
    color: "#4d5d66",
    fontWeight: "bold",
    textDecoration: "underline"
}

const btnForOthers1 = {
    cursor: "pointer",
    color: "#763bff",
    border: "solid 2px",
    borderRadius: "5px",
    padding: "0.3rem 1rem 0.3rem 1rem"
}

const btnForOthers2 = {
    cursor: "pointer",
    color: "white",
     backgroundColor: "#763bff",
    borderRadius: "5px",
    padding: "0.3rem 1rem 0.3rem 1rem",
}

const btnForDelete = {
    cursor: "pointer",
    // backgroundColor:"white", 
    color: "#ed4832", 
  border: "solid 2px",
  borderRadius: "5px", 
    padding: "0.3rem 1rem 0.3rem 1rem",
  
}

/* SDIEBAR */
const sidebar = {
    color: "#b1becc",
    width: "25%",
    height: "100%",
    display: "inline-block",
    border: "2px solid #b1becc",
    borderRadius: "5px",
    textAlign: "center",
    fontWeight: "bold"

}
  

const sideBarBtns = {
    cursor: "pointer",
    color: "#b1becc",
    margin: "0.2rem",
    fontWeight: "600",
    padding: "0.5rem"
}
  
const modal = {
    position: "relative",
    padding: "1rem",
    color: "#b1becc",
    border: "2px solid",
    borderRadius: "10px"
}

const modalCloseBtn = {
    cursor: "pointer",
    position: "absolute",
    right: "0",
    top: "0",
    padding: "0.5rem"
}


export {
    column,
    columnTitle,
    task,
    taskHoverAndFocus,
    btnForColumn,
    btnForOthers1,
    btnForOthers2,
    btnForDelete,
    sidebar,
    sideBarBtns,
    modal,
    modalCloseBtn,
};