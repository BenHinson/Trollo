import React, {useState} from "react";
// import Board from "./Board";
// import User from "./User";
import DummyBoard from "./DummyBoard";
import DummyUser from "./DummyUser";

export default function Project() {
  const dummyBoardsArr = [{id:1, name: "boardname1" }, {id:2, name: "boardname2" }];
  const dummyMembers = [{ id: 1, name: "Susie" }, { id: 2, name: "Hugo" }];
  
  const [view, setView] = useState("board")
  const [boardName, setBoardname] = useState("");
  const [boardForm, setBoardForm] = useState(false);
  const [dummyBoards, setDummyBoards] = useState(dummyBoardsArr);

  let boardId = 3;

  const showSidebar = event => {
    // console.log("sidebar opens");
  };

  const showBoards = event => {
    console.log("board open");
    setView("board")
  };

  const showMembers = event => {
    console.log("member open");
    setView("member")
  };

  const showCreateForm = event => {
    // if "boardForm" sets to true, render a form to create a board
    setBoardForm(true);
  }
  
  const boardform = () => {
    /* a board creation form 
      - changes are tracked by "onChangeBoardName" function
      - value is tracked by "boardName"
      - once button is clicked, it triggers "createBoard"
    */
    return (
      <div>
        <input placeholder="Add board title" value={boardName} onChange={onChangeBoardname} />
        <button onClick={ createBoard } >Create Board</button>
      </div>     
    )
  }
  
  const onChangeBoardname = event => {
    setBoardname(event.target.value);
  }

  const createBoard = event => {
    // create a board object.
    const board = { id: boardId, name: boardName };
    dummyBoardsArr.push(board);
    boardId++;

    console.log('BOARD CREATED: ');
    // console.log(dummyBoards)
  }

  const deleteBoard = event => {
    // MIND THE TYPE
    const boardId = parseInt(event.target.id);

    const removeItem = dummyBoards.filter(board => board.id !== boardId);
    setDummyBoards(removeItem);
 }

  const listBoards = () => dummyBoards.map(board => {
    return (
      <div key={board.id}>
        <DummyBoard name={board.name} />
        <button onClick={deleteBoard} id={ board.id}>Delete</button>
      </div>
    )
  });
  const listMembers = () => dummyMembers.map(member => <DummyUser key={member.id} name={member.name} />);

  return (
    <div>
      <section onClick={showSidebar}>
        <p>Placeholder: workspace Name</p>
        <p onClick={showBoards}>Boards</p>
        <div onClick={showCreateForm}>create new board</div>
        <p onClick={showMembers}>Members</p>
      </section>

      <section>
        {view === "board" && listBoards()}
        {view === "member" && listMembers()}
      </section>
      
      <section>
        {boardForm && boardform()}
      </section>
    </div>
  );
}
