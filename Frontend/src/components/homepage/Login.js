import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../UserContext";

export default function Login({ setAccountLogin, setDisplayModal }) {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const { handleLogin } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const handleLogIn = async (e) => {
    e.preventDefault();
    let login = await (
      await fetch(`http://localhost:2053/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      })
    ).json();

    if (login.error) {
      setMessage(login.error);
    } else {
      setDisplayModal(false);
      handleLogin(login.account);
    }
  };

  return (
    <div>
      <input
        name="email"
        placeholder="Email..."
        onChange={(e) => setEmailValue(e.target.value)}
      ></input>
      <input
        name="password"
        type="password"
        placeholder="Password..."
        onChange={(e) => setPasswordValue(e.target.value)}
      ></input>

      {message ? <p>{message}</p> : <p></p>}

      <button className="navBtn submitAccountBtn" onClick={handleLogIn}>
        Login
      </button>

      <button
        className="navBtn navBtnInv switchFormBtn"
        onClick={() => {
          setAccountLogin(false);
        }}
      >
        Create Account
      </button>
    </div>
  );
}
