import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";

import AccountCreateLogin from "./AccountCreateLogin";
import "../../Styling/homepage.css";

export default function Homepage({ setPageView }) {
  const { user, updateState } = useContext(UserContext);
  const [displayModal, setDisplayModal] = useState(false);
  const [accountLogin, setAccountLogin] = useState(false);

  return (
    <div
      className="homepage"
      style={displayModal ? { backgroundColor: "var(--component)" } : null}
    >
      {user?.username ? (
        <button
          className="navBtn accountBtn"
          onClick={() => {
            setAccountLogin(true);
            setDisplayModal(true);
          }}
        >
          Switch User
        </button>
      ) : (
        <button
          className="navBtn accountBtn"
          onClick={() => {
            setAccountLogin(false);
            setDisplayModal(true);
            setDisplayModal(true);
          }}
        >
          Create Account
        </button>
      )}

      <div className="welcomeContainer">
        <div>
          <h1>Welcome to Trollo!</h1>
          <p>
            Stressed from managing a project? have Trollo handle that for you
          </p>
        </div>

        {user?.username ? (
          <button
            className="navBtn navBtnInv projectsBtn"
            onClick={() => {
              setPageView("app");
            }}
          >
            View My Projects
          </button>
        ) : (
          <button
            className="navBtn navBtnInv projectsBtn"
            onClick={() => {
              setAccountLogin(true);
              setDisplayModal(true);
            }}
          >
            Login to Trollo
          </button>
        )}
      </div>

      {displayModal ? (
        <AccountCreateLogin
          accountLogin={accountLogin}
          setAccountLogin={setAccountLogin}
          setDisplayModal={setDisplayModal}
        />
      ) : null}
    </div>
  );
}
