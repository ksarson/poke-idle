export const checkUserCredentials = async (
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    console.log("Login Successful:", data);
    onLoginSuccess();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error logging in:", error.message);
      return { message: error.message };
    } else {
      console.error("Unexpected error:", error);
      return { message: "An unexpected error occurred." };
    }
  }
};

export default checkUserCredentials;
