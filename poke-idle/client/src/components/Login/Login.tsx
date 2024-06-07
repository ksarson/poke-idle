import "../../styles/Login.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";
import createUser from "../../endpoints/CreateUser";
import checkUserCredentials from "../../endpoints/CheckUserCredentials";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [action, setAction] = useState<"login" | "register">("login");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleCreateAccount = async () => {
    setIsCreatingAccount(true);
    await createUser(username, password);
    setTimeout(() => {
      checkUserCredentials(username, password, onLoginSuccess);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "register") {
      handleCreateAccount();
    } else if (action === "login") {
      checkUserCredentials(username, password, onLoginSuccess);
    }
  };

  return (
    <main>
      <div>Login or Register</div>
      <form onSubmit={handleSubmit}>
        <label className="login-label">
          Username
          <input
            className="login-input"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label className="login-label">
          Password
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        {isCreatingAccount && (
          <div className="account-creation-notif">Creating your account...</div>
        )}
        <button
          className="login-page-button"
          type="submit"
          onClick={() => setAction("register")}
        >
          Register
        </button>
        <button
          className="login-page-button"
          type="submit"
          onClick={() => setAction("login")}
        >
          Login
        </button>
      </form>
    </main>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;
