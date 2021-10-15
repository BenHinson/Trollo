export default function Header({projectName, boardName, members}) {

  return (
    <div className='boardHeader'>
      <span className='boardLocation'>
        <p>{projectName}</p>
        <p>{`>`}</p>
        <p>{boardName}</p>
      </span>

      <div className='members'>
        <span className='membersList'>
          {/* List of members icons here */}
          {/* <img src=''> */}
        </span>
        <button className='memberInviteBtn'>Invite</button>
      </div>
    </div>
  );
}