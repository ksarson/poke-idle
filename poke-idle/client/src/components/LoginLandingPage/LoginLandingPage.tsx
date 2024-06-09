import "../../styles/LoginLandingPage.scss";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Login from "./Login";
import Register from "./Reigster";

interface LoginLandingPageProps {
  onLoginSuccess: () => void;
}

const LoginLandingPage: React.FC<LoginLandingPageProps> = ({
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const passwordPattern =
    "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,}$";

  console.log(errorMessage);
  useEffect(() => {
    setUsername("");
    setPassword("");
  }, [isLogin]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const defineErrorMessage = (message: string) => {
    setErrorMessage(message);
  };

  return (
    <main>
      <div className="login-header">{isLogin ? "Login" : "Register"}</div>
      {isLogin ? (
        <Login
          username={username}
          password={password}
          onLoginSuccess={onLoginSuccess}
          clearErrorMessage={clearErrorMessage}
          defineErrorMessage={(message: string) => defineErrorMessage(message)}
          errorMessage={errorMessage}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
        />
      ) : (
        <Register
          username={username}
          password={password}
          onLoginSuccess={onLoginSuccess}
          clearErrorMessage={clearErrorMessage}
          defineErrorMessage={(message: string) => defineErrorMessage(message)}
          errorMessage={errorMessage}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
          passwordPattern={passwordPattern}
        />
      )}
      <div
        className="login-or-register"
        onClick={() => {
          setIsLogin(!isLogin);
          setErrorMessage("");
        }}
      >
        {isLogin
          ? "New Player? Register Here!"
          : "Returning Player? Login Here!"}
      </div>
    </main>
  );
};

LoginLandingPage.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginLandingPage;
