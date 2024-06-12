import "../../styles/LoginLandingPage.scss";
import React from "react";
import PropTypes from "prop-types";
import checkUserCredentials from "../../api/checkUserCredentials";

interface LoginProps {
  username: string;
  password: string;
  onLoginSuccess: () => void;
  clearErrorMessage: () => void;
  defineErrorMessage: (message: string) => void;
  errorMessage: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Login: React.FC<LoginProps> = ({
  username,
  password,
  onLoginSuccess,
  clearErrorMessage,
  defineErrorMessage,
  errorMessage,
  onUsernameChange,
  onPasswordChange,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submissionResponse = await checkUserCredentials(
      username,
      password,
      onLoginSuccess
    );

    if (submissionResponse.isSuccessful) {
      clearErrorMessage();
    } else {
      defineErrorMessage(submissionResponse.message as string);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h6>
          <label className="login-label">
            Username
            <input
              className="login-input"
              type="text"
              value={username}
              onChange={onUsernameChange}
              required
            />
          </label>
        </h6>
        <h6>
          <label className="login-label">
            Password
            <input
              className={"login-input"}
              type="password"
              value={password}
              onChange={onPasswordChange}
              required
            />
          </label>
        </h6>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="login-page-button" type="submit">
          <h5>Login</h5>
        </button>
      </form>
    </>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
  clearErrorMessage: PropTypes.func.isRequired,
  defineErrorMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};

export default Login;
