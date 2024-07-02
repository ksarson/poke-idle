import axios from "axios";

export const checkUserCredentials = async (
  username: string,
  password: string,
  onLoginSuccess: () => void
) => {
  try {
    console.log("Logging in User...");
    const response = await axios.post(
      "http://localhost:3000/api/users/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.data;
    await sessionStorage.setItem("playerInfo", JSON.stringify(data.player));
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
