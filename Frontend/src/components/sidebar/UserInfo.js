export default function UserInfo({ handleLogout, user }) {
  const capFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  return (
    <div className='userInfo'>
      <span>
        <img src="https://img.icons8.com/ios/50/000000/user--v1.png"/>
        {/* <Avatar userId={user.id} userData={user } /> */}
        <p>{capFirstLetter(user.username)}</p>
      </span>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}