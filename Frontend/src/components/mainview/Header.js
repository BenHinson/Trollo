import Avatar from "boring-avatars"

export default function Header({ projectName, boardName, membersArray=[] }) {

  return (
    <div className='boardHeader'>
      <span className='boardLocation'>
        <p>{projectName}</p>
        <p>{`>`}</p>
        <p>{boardName}</p>
      </span>

      <div className='members'>
        <span className='membersList'>
          {membersArray.map((member) => {
            return <Avatar size='30' variant="beam"/>
          })}
        </span>
        <button className='memberInviteBtn'>Invite</button>
      </div>
    </div>
  );
}