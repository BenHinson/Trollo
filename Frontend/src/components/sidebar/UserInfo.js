import Avatar from "boring-avatars";
import UserAvatar from "../mainview/UserAvatar";

export default function UserInfo({ handleLogout, user }) {
  const capFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="userInfo">
      <span>
        <UserAvatar size="44" userId={user.id} />
        <p>{capFirstLetter(user.username)}</p>
      </span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
