const checkUserCredentials = async (
  username: string,
  password: string,
  onLoginSuccess: () => void
) => {
  try {
    console.log("Logging in User...");

    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Login Successful:", data);
    onLoginSuccess();
  } catch (error) {
    console.error("User does not exist:", error);
  }
};

export default checkUserCredentials;
