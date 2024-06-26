import "../../styles/LoginLandingPage.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";
import createUser from "../../apis/users/createUser";
import checkUserCredentials from "../../apis/users/checkUserCredentials";

interface RegisterProps {
  username: string;
  password: string;
  onLoginSuccess: () => void;
  clearErrorMessage: () => void;
  defineErrorMessage: (message: string) => void;
  errorMessage: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  usernamePattern: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordPattern: string;
}

const Login: React.FC<RegisterProps> = ({
  username,
  password,
  onLoginSuccess,
  clearErrorMessage,
  defineErrorMessage,
  errorMessage,
  onUsernameChange,
  usernamePattern,
  onPasswordChange,
  passwordPattern,
}) => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleCreateAccount();
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

  const handleCreateAccount = async () => {
    setIsCreatingAccount(true);
    const creationResponse = await createUser(username, password);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsCreatingAccount(false);

    if (creationResponse.isSuccessful) {
      clearErrorMessage();
    } else {
      setIsCreatingAccount(false);
      defineErrorMessage(creationResponse.message);
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
              pattern={usernamePattern}
              title="Password must be at no longer than 16 characters, containing only alphanumeric characters or any of (!@#$%^&*?)"
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
              pattern={passwordPattern}
              title="Password must be at least 10 characters long and contain at least 1 number and 1 special character (!@#$%^&*?)"
            />
          </label>
        </h6>
        {isCreatingAccount && (
          <p className="creating-account-notif">Creating your account...</p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="login-page-button" type="submit">
          <h5>Register</h5>
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
  usernamePattern: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  passwordPattern: PropTypes.string.isRequired,
};

export default Login;
