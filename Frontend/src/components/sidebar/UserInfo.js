import Avatar from "boring-avatars"

export default function UserInfo({ handleLogout, user }) {
  const capFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <div className='userInfo'>
      <span>
        <Avatar size='44' variant="beam" title={user.username}/>
        <p>{capFirstLetter(user.username)}</p>
      </span>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}